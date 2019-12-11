import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  lat = -6.256098;
  lng = 106.618947;
  @ViewChild('map', {static: false}) mapElementRef: ElementRef;
  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps().then((googleMaps) => {
      const mapElement = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapElement, {
        center: {lat: this.lat, lng: this.lng},
        zoom: 16,
      });
      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapElement, 'visible');
      });
      // const marker = new googleMaps.Marker({position: {lat: this.lat, lng: this.lng}, map});
      // console.log(marker);

      this.getLocation().then(loc => {
        if (!loc) {
          const marker = new googleMaps.Marker ({
            position: { lat: this.lat, lng: this.lng}, map });
          } else {
            const marker = new googleMaps.Marker ({
              position: {lat: loc.latitude, lng: loc.longitude }, map
            });
        }
      });

      map.addListener('click', event => {
        const selectedCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        this.modalCtrl.dismiss(selectedCoords);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onChooseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.mapsAPIKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK is not available');
        }
      };
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Failed',
      message: 'Could not get user location.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async getLocation() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.presentAlert();
      return null;
    }
    const coordinates = await Plugins.Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

}

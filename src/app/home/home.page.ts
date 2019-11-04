import { NewBookingPage } from './new-booking/new-booking.page';
import { BookingsService } from './bookings.service';
import { Component } from '@angular/core';
import { Booking } from './booking.interface';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private bookings: Booking[] = [];

  constructor(
    private bookingSvc: BookingsService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){

  }

  getBookings(){
    this.bookingSvc.fetchBookings()
      .subscribe((bookings) => {
        console.log(bookings);
      });
  }

  async presentAlertPrompt(){
    const alert = await this.alertCtrl.create({
      header: 'Delete a Booking',
      inputs:[
        {
          name: 'bookingId',
          type: 'text',
          placeholder: 'Enter your booking ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.bookingSvc.deleteBookings(data.bookingId)
              .subscribe(()=>{
                this.bookingSvc.fetchBookings()
                  .subscribe((bookings) => {
                    console.log(bookings);
                  });
                  console.log("DELETED");
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: NewBookingPage
    });
    return await modal.present();
  }

  newBooking(){
    this.presentModal();
  }

  deleteBooking(){
    this.presentAlertPrompt();
  }
}

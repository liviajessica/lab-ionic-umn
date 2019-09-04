import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] =[
    new Place(
      'p1',
      'Serpong M-Town',
      '2BR apartment near Summarecon Mall Serpong',
      '',
      7000000000
    ),
    new Place(
      'p2',
      'Scientia Residence',
      'Near UMN with many choice of foods around.',
      '',
      1000000000000
    ),
  ]

  constructor() { }
}

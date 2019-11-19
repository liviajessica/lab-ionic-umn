import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'map-modal', loadChildren: './map-modal/map-modal/map-modal.module#MapModalPageModule' },
  // { path: 'pickers', loadChildren: './pickers/pickers/pickers.module#PickersPageModule' },
  // { path: 'location-picker', loadChildren: './location-picker/location-picker/location-picker.module#LocationPickerPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

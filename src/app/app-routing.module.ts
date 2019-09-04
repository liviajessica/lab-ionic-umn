import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//   { path: '', redirectTo: 'recipes', pathMatch: 'full' },
//   {
//     path: 'recipes',
//     children: [
//       {
//         path: '',
//         loadChildren: './recipes/recipes.module#RecipesPageModule'
//       },
//       {
//         path: ':recipeId',
//         loadChildren: './recipes/recipe-detail/recipe-detail.module#RecipeDetailPageModule'
//       }
// ]}, 
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule' },
  { path: 'offer-bookings', loadChildren: './places/offers/offer-bookings/offer-bookings.module#OfferBookingsPageModule' },
  { path: 'edit-offer', loadChildren: './places/offers/edit-offer/edit-offer.module#EditOfferPageModule' },
  { path: 'new-offer', loadChildren: './places/offers/new-offer/new-offer.module#NewOfferPageModule' },
  { path: 'offers', loadChildren: './places/offers/offers.module#OffersPageModule' },
  { path: 'place-detail', loadChildren: './places/discover/place-detail/place-detail.module#PlaceDetailPageModule' },
  { path: 'discover', loadChildren: './places/discover/discover.module#DiscoverPageModule' },
  
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

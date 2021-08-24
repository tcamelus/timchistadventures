import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccomodationsComponent } from './components/accomodations/accomodations.component';
import { AdventuresComponent } from './components/adventures/adventures.component';
import { CarHireComponent } from './components/car-hire/car-hire.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { AttractionComponent } from './components/attraction/attraction.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { PlannedComponent } from './components/planned/planned.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"about", component:AboutComponent},
  {path:"adventures", component:AdventuresComponent},
  {path:"destinations", component:DestinationsComponent},
  {path:"car-hire", component:CarHireComponent},
  {path:"accomodations", component:AccomodationsComponent}, 
  {path: "planned", component:PlannedComponent}, 
  {path:"attraction/:destination", component:AttractionComponent},
  {path: "services/:attraction", component:ServicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AboutComponent, 
  AdventuresComponent,
  DestinationsComponent,
  CarHireComponent,
  AccomodationsComponent,
  AttractionComponent,
  HomeComponent,
  ServicesComponent,
  PlannedComponent
 ]

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import{MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AttractionComponent } from './components/attraction/attraction.component';
import { ClientDboardComponent } from './components/client-dboard/client-dboard.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AvatarModule } from 'ngx-avatar';
import { PromosComponent } from './components/promos/promos.component';
import { ServicesComponent } from './components/services/services.component';
import { PlannedComponent } from './components/planned/planned.component';
import { PlanningService } from './data.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    AttractionComponent,
    ClientDboardComponent,
    HomeComponent,
    PromosComponent,
    ServicesComponent,
    PlannedComponent,
    OurServicesComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    HttpClientModule,
    NgbModule,
    FlexLayoutModule,
    AvatarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [PlanningService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }

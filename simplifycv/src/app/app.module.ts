import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppService } from './app.service';
import {apphttpinterceptor} from './app.interceptor';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DisableCardDirective } from './directives/disable-card.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LandingPageComponent,
    DisableCardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    AppService,
    {provide: 'apiBase', useValue:''},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: apphttpinterceptor,
      multi :true
    }
  ],
  bootstrap: [AppComponent]   
})
export class AppModule { }

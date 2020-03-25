import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppService } from './app.service';
import {apphttpinterceptor} from './app.interceptor';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CvgeneratorComponent } from './cvgenerator/cvgenerator.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CvgeneratorComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    HttpModule,
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

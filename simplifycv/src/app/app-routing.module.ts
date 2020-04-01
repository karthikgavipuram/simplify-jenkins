import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ProfileComponent} from './profile/profile.component'
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  { path: '',redirectTo:'start',pathMatch:'full'},
  { path: 'start', component: LandingPageComponent},
  { path: 'home', component: HomeComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

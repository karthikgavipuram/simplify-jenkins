import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ProfileComponent} from './profile/profile.component'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfileBuilderComponent } from './profile-builder/profile-builder.component';


const routes: Routes = [
  { path: '',redirectTo:'start',pathMatch:'full'},
  { path: 'start', component: LandingPageComponent},
  { path: 'home', component: HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'builder',component:ProfileBuilderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

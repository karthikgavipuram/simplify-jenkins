import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CvgeneratorComponent} from './cvgenerator/cvgenerator.component'
import {HomeComponent} from './home/home.component'
import {ProfileComponent} from './profile/profile.component'


const routes: Routes = [
  { path: '',redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'cvgenerator', component: CvgeneratorComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileBuilderComponent } from './profile-builder/profile-builder.component';
import { CvuploadComponent } from './cvupload/cvupload.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublishComponent } from './publish/publish.component';


const routes: Routes = [
  { path: '',redirectTo:'profilebuilder',pathMatch:'full'},
  // { path: 'cvupload',component:CvuploadComponent},
  { path: 'profilebuilder',component:ProfileBuilderComponent},
  { path : 'publish',component:PublishComponent},
  { path : 'page',component:LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

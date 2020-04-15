import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileBuilderComponent } from './profile-builder/profile-builder.component';
import { CvuploadComponent } from './cvupload/cvupload.component';


const routes: Routes = [
  { path: '',redirectTo:'cvupload',pathMatch:'full'},
  { path: 'cvupload',component:CvuploadComponent},
  { path: 'profilebuilder',component:ProfileBuilderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

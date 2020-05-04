import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '@root/app.component';

const routes: Routes = [{
  path: '', component:AppComponent,
  children: [
    { path : '', redirectTo: 'dashboard',pathMatch:'full'},
    {path: 'dashboard',loadChildren:()=>import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule) }
  ]
}
  // {path:'',loadChildren:()=>import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

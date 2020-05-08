import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
import { DashboardComponent } from './dashboard.component'


const routes: Routes = [{
    path: '', component: DashboardComponent,
    children: [
        { path: '', redirectTo: 'profilebuilder', pathMatch: 'full' },
        { path: 'profilebuilder', loadChildren:()=>import('./profile-builder/profile-builder.module').then(mod => mod.ProfileBuilderModule) },
        { path: 'templates', loadChildren:()=>import('./templates/templates.module').then(mod => mod.TemplatesModule) }
    ]
}]

// const ROUTES: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }
export const routingComponents = [DashboardComponent]
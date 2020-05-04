import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
import { TemplatesComponent } from './templates.component'
import { DefaultComponent } from './default/default.component';


const routes: Routes = [{
    path: '', component: TemplatesComponent,
    children: [
        { path: '', redirectTo: 'default', pathMatch: 'full' },
        { path: 'default', component:DefaultComponent},
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TemplatesRoutingModule { }
export const routingComponents = [TemplatesComponent,DefaultComponent]
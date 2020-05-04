import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//
import { TemplatesComponent } from './templates.component'
import { TemplateComponent } from './template/template.component';
import { Template2Component } from './template2/template2.component';


const routes: Routes = [
    {path: '', component: TemplatesComponent},
    {path: 'template1', component: TemplateComponent},
    {path: 'template2', component: Template2Component}
   ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TemplatesRoutingModule { }
export const routingComponents = [TemplatesComponent,TemplateComponent,Template2Component]
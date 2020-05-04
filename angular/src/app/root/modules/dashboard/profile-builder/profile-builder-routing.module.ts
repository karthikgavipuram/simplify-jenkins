import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileBuilderComponent } from './profile-builder.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [{path:'',component:ProfileBuilderComponent},{path:'default',component:DefaultComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProfileBuilderRoutingModule { }
export const routingComponents = [ProfileBuilderComponent,DefaultComponent]
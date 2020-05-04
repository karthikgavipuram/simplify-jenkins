import { NgModule } from '@angular/core'
import {ProfileBuilderRoutingModule,routingComponents} from './profile-builder-routing.module'
import {SharedModule} from '@shared-module'

@NgModule({
    declarations: [routingComponents],
    imports: [
      ProfileBuilderRoutingModule,
      SharedModule
    ]
  })

export class ProfileBuilderModule{}
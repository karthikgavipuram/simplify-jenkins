import { NgModule } from '@angular/core'
import {SharedModule} from '@shared-module';
import {TemplatesRoutingModule,routingComponents} from './templates-routing.module'


@NgModule({
    declarations: [routingComponents],
    imports: [
      TemplatesRoutingModule,
      SharedModule
    ]
  })

export class TemplatesModule{}
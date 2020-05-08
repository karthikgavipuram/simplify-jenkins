import { NgModule } from '@angular/core'
import {SharedModule} from '@shared-module';
import {QRCodeModule} from 'angularx-qrcode';
import {TemplatesRoutingModule,routingComponents} from './templates-routing.module';
import { Template3Component } from './template3/template3.component';


@NgModule({
    declarations: [routingComponents, Template3Component],
    imports: [
      TemplatesRoutingModule,
      SharedModule,
      QRCodeModule
    ]
  })

export class TemplatesModule{}
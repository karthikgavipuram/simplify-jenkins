import { NgModule } from '@angular/core'
import {SharedModule} from '@shared-module';
import {QRCodeModule} from 'angularx-qrcode';
import {TemplatesRoutingModule,routingComponents} from './templates-routing.module';


@NgModule({
    declarations: [routingComponents],
    imports: [
      TemplatesRoutingModule,
      SharedModule,
      QRCodeModule
    ]
  })

export class TemplatesModule{}
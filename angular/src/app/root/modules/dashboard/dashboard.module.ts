import { NgModule } from '@angular/core';
//
import { DashboardService } from './dashboard.service';
import { DashboardRoutingModule, routingComponents } from './dashboard-routing.module'
import { SharedModule } from '@shared-module';
//

@NgModule({
  declarations: [routingComponents],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [DashboardService]
})

export class DashboardModule { }
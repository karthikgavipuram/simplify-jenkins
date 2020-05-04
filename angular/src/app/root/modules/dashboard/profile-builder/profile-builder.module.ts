import { NgModule } from '@angular/core'
import {ProfileBuilderComponent} from './profile-builder.component'
import { RouterModule, Routes } from '@angular/router'
import {SharedModule} from '@shared-module'

const ROUTES:Routes=[{ path: '', component:ProfileBuilderComponent}]

@NgModule({
    declarations: [ProfileBuilderComponent],
    imports: [
      RouterModule.forChild(ROUTES),
      SharedModule
    ]
  })

export class ProfileBuilderModule{}
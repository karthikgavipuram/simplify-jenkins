import {CommonModule} from '@angular/common'
import {SharedComponent} from './shared.component'
import { NgModule } from '@angular/core';
import { CommonInputComponent } from './common-input/common-input.component';
import { CommonInputTableComponent } from './common-input-table/common-input-table.component'
import {FormsModule} from '@angular/forms';
import { CommonImageComponent } from './common-image/common-image.component'
import {ContenteditableModel} from '../directives/contenteditable.directive';

@NgModule({
    imports:[CommonModule, FormsModule],
    providers:[],
    declarations:[SharedComponent,CommonInputComponent, CommonInputTableComponent, CommonImageComponent, ContenteditableModel],
    exports:[SharedComponent, CommonInputComponent, CommonInputTableComponent, CommonImageComponent, ContenteditableModel],
    entryComponents:[]
})



export class SharedModule {}
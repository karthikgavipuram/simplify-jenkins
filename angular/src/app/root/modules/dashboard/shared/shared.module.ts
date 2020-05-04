import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SharedComponent } from './shared.component';


@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }

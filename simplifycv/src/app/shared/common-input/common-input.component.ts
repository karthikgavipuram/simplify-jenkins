import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-input',
  // template: `<input type='text' class="form-control" style="width:160px" placeholder={{_details.placeholder}} name="input{{_details.key}}" [(ngModel)]="_details.value" (ngModelChange)="emitValue()"/>`,
  template:`<div contenteditable="true" (update)="emitValue($event)" [contenteditableModel]="_details.value" style="width:150px;text-align:center"></div>`,
  styleUrls: ['./common-input.component.css']
})
export class CommonInputComponent implements OnInit {
  @Input('details') _details:any
  @Output() emitVal = new EventEmitter<{}>()
  constructor() { }

  ngOnInit() {
    if(!this._details.placeholder) this._details.placeholder = ""
  }

  timeout:any
  emitValue(event){
    this._details.value = event
    this.emitVal.emit(this._details)
  }
  

}

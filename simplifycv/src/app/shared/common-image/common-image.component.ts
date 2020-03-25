import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-common-image',
  template: `<div class="pro-img">
              <div class="display-image">
                <div *ngIf=" noImage ; else load">
                  <input  id="fileUpload" #fileUpload accept="image/*" type="file"  (change)="readUrl($event)"  />
                </div>
              <ng-template #load>
                <img src={{img_url}} />
              </ng-template>
              </div>
            </div>`,
  styleUrls: ['./common-image.component.css']
})
export class CommonImageComponent implements OnInit {
@Input('image') _image:any
noImage:boolean = true
img_url:any
@Output() 
emitImageStr = new EventEmitter<{}>()


  constructor(private sanitizer:DomSanitizer) { }

  
  ngOnInit() {
   if(this._image) {
     this.img_url  = this._image
     this.noImage = false
   }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      this.img_url = ""
      var reader = new FileReader()
      reader.onload = (result: any) => {
        this.img_url= result.target.result
        event.target.value=""
        this.noImage = false
        this.emitImageStr.emit({value:this.img_url})

     }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  
}

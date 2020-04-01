import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[DisableCard]'
})
export class DisableCardDirective {
  isDisabled:boolean=false;
  constructor(private elRef: ElementRef) {
    console.log(elRef);
    // elRef.nativeElement.qu
   }
  // disable(){
  //   if(this.isDisabled)
  //     this.isDisabled=false
  //   else
  //     this.isDisabled=true;
  // }

}

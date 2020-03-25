import { Directive, ElementRef, Input, Output, OnChanges, EventEmitter } from "@angular/core";

@Directive({
	selector: '[contenteditableModel]',
	host: {
		'(keyup)': 'onKeyUp()'
	}
})
export class ContenteditableModel {

	@Input('contenteditableModel') model: any;
	@Output() update = new EventEmitter();


	constructor(private elRef: ElementRef) {

	}

	timeout: any
	onKeyUp() {
		var value = this.elRef.nativeElement.innerText
		if (this.timeout) {
			clearTimeout(this.timeout)
		}
		this.generateEmit(value)
	}


	generateEmit(value) {
		this.timeout = setTimeout(() => {
			this.update.emit(value)
		}, 1000);
	}

}
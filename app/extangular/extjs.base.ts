/// <reference path="../../node_modules/retyped-extjs-tsd-ambient/ExtJS.d.ts" />
import { ElementRef, EventEmitter } from '@angular/core';

export abstract class ExtJSBase {
	public extjsObject: any;
	//private config: any = {};
	private rootElement: any;
	private fit: boolean = false;

	//constructor(myElement: ElementRef, @Attribute('fit') fit: any) {
	constructor(myElement: ElementRef, fit: any) {
		//myElement.nativeElement.parentElement.style.width = '100%';
		//myElement.nativeElement.parentElement.style.height = '100%';
		if (fit === null) {
			this.fit = false;
		} else {
			this.fit = true;
		}
		//console.log(myElement.nativeElement);
		this.rootElement = myElement.nativeElement;
	}
}

import { 
	Component, 
	Input, 
	Output, 
	OnInit, 
	Attribute, 
	ElementRef, 
	EventEmitter } from '@angular/core';

@Component({
  selector: 'extjs-button',
	inputs: [ 'config', 'text'],
	outputs: ['click'],
	template: ``
})
export class ExtJSButton {
	private text: string;
	private click: EventEmitter<any> = new EventEmitter();



	public extjsObject: any;
	//private config: any = {};
	private rootElement: any;
	private fit: boolean = false;

	constructor(myElement: ElementRef, @Attribute('fit') fit: any) {
	//constructor(myElement: ElementRef, fit: any) {
		if (fit === null) {
			this.fit = false;
		} else {
			this.fit = true;
		}
		//console.log(this.fit);
		this.rootElement = myElement.nativeElement;
	}

	public ngOnInit() {
		let me: any  = this;
		if (me.rootElement.childElementCount === 0) {
			let o: any = {
				xtype: 'button',
				renderTo: me.rootElement,

				text: me.text,
				listeners: {
					scope: me,
					click: function(o, e, eOpts) {
						//me.exttap.emit({});
						me.click.next();

						// setTimeout(function() {
						// 	me.exttap.emit({})
						// }, 1000);
						// me.exttap.emit({
						// 	o: o,
						// 	e: e,
						// 	eOpts: eOpts
						// })
					}
				}
			};
			if (me.fit === true) {o.plugins = [ 'fittoparent' ]; } else {o.height = 30; };
			if (me.config !== {} ) {
				Ext.apply(o, me.config);
			};
			Ext.create(o);
		}

		// setTimeout(function() {
		// 	me.exttap.emit({})
		// }, 5000);

		// let iDiv = document.createElement('div');
		// iDiv.innerHTML = "hello";
		// iDiv.addEventListener('click', function (event) {
		// 	me.exttap.emit({});
		// });
		// me.rootElement.appendChild(iDiv);

	}

}
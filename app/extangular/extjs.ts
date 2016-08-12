import { 
	Component, 
	Input, 
	Output, 
	OnInit, 
	Attribute, 
	ElementRef, 
	EventEmitter } from '@angular/core';

@Component({
  selector: 'extjs',
	inputs: [ 'xtype', 'config'],
	outputs: [ 'ready', 'click', 'selectionchange'],
	template: ``
})
export class ExtJS {
	private xtype: string;
	private config: any = {};
	private click: EventEmitter<any> = new EventEmitter();
	private selectionchange: EventEmitter<any> = new EventEmitter();

	public extjsObject: any;
	private rootElement: any;
	private fit: boolean = false;

	constructor(myElement: ElementRef, @Attribute('fit') fit: any) {
	//constructor(myElement: ElementRef, fit: any) {
		this['ready'] = new EventEmitter();
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
				xtype: me.xtype,
				renderTo: me.rootElement,

				text: me.text,
				listeners: {
					scope: me,
					selectionchange: function(tree, node) {
						var o:any = {};
						o.tree = tree;
						o.node = node;
						me.selectionchange.next(o);
					},
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
			if (me.fit === true) {o.plugins = [ 'fittoparent' ]; } else {o.height = 300; };
			if (me.config !== {} ) {
				Ext.apply(o, me.config);
			};
			//Ext.create(o);
			me.extjsObject = Ext.create(o);
			me.ready.next(me);
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
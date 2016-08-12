import { Component, Input, OnInit, ElementRef, EventEmitter, Attribute, SimpleChange } from '@angular/core';
import { ExtJSBase } from './extjs.base';
//import { ExtJSUtil } from './extjs.util';
import { ExtJSEvents } from './extjs.events';

@Component({
	selector: 'extjs-grid',
	outputs:  [
		'ready',
		'select',
		'selectionchange',
		'beforecellclick',
		'enable',
		'headerclick'
	],
	template: ``
})
export class ExtJSGrid extends ExtJSBase implements OnInit {
	@Input() private title: string = '';
	@Input() private columns: any = {};
	@Input() private selModel: any = {};
	@Input() private plugins: any = [];
	@Input() private store: any = {};
	@Input() private config: any = {};

	private theEvents = [];
	private listeners = {};

	// private EVENTS = [
	// 	'select',
	// 	'selectionchange',
	// 	'beforecellclick',
	// 	'enable',
	// 	'headerclick'
	// ]
	// private PARAMETERS = [
	// 	'this,record,index,eOpts',
	// 	'this,selected,eOpts',
	// 	'this,td,cellIndex,record,tr,rowIndex,e,eOpts',
	// 	'this,eOpts',
	// 	'ct,column,e,t,eOpts'
	// ]

	constructor(myElement: ElementRef, @Attribute('fit') fit: any) {
		super(myElement, fit);
		

		// // create all the events generically. this is done generically so that
		// // if the list of grid events change, we don't need to change this code.
		//this.ready = new EventEmitter();
		this['ready'] = new EventEmitter();
		let me = this;
		me.theEvents = ExtJSEvents['grid'];
		me.theEvents.forEach( (event, n) => {
			(<any>this)[event.name] = new EventEmitter();
			me.listeners[event.name] = function() {
					let parameters = me.theEvents[n].parameters;
					let parms = parameters.split(',');
					let args = Array.prototype.slice.call(arguments);
					let o: any = {};
					for (let i = 0, j = parms.length; i < j; i++ ) {
						if (parms[i] !== 'eOpts') {
							o[parms[i]] = args[i];
						}
					}
					me[event.name].next(o);
			};
		});
	}

	public ngOnChanges(changes: {[title: string]: SimpleChange}) {
		if (this.extjsObject !== undefined) {
			this.extjsObject.setTitle(changes['title'].currentValue);
		}
	}

	public ngOnInit() {
		let me: any  = this;
		if (me.rootElement.childElementCount === 0 ) {
			let o: any = {
				xtype: 'grid',
				renderTo: me.rootElement
			};
			if (me.plugins !== [] ) {o.plugins = me.plugins; };
			if (me.fit === true ) {
				if (o.plugins != undefined) {
					o.plugins.push({ ptype: 'fittoparent' });
				} else {
					o.plugins = [{ ptype: 'fittoparent' }]; 
				}
			} else {o.height = 300; };

			o.listeners = me.listeners;
			if (me.title !== {} ) {o.title = me.title; };
			o.columns = me.columns;
			if (me.selModel !== {} ) {o.selModel = me.selModel; };
			o.store = me.store;
			if (me.config !== {} ) {
				Ext.apply(o, me.config);
			};
			me.extjsObject = Ext.create(o);
			me.ready.next(me);
		}
	}

}

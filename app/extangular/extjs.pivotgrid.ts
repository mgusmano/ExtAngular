import { Component, Input, OnInit, ElementRef, EventEmitter, Attribute } from '@angular/core';
import { ExtJSBase } from './extjs.base';

@Component({
	selector: 'extjs-pivotgrid',
	outputs: [
		'ready',
		'cellclick',
		'pivotdone',
		'pivotgroupcellclick'
	],
	template: ``
})
export class ExtJSPivotGrid extends ExtJSBase implements OnInit {
	@Input() private title: string = '';
	@Input() private topAxis: any = {};
	@Input() private leftAxis: any = {};
	@Input() private aggregate: any = {};
	@Input() private store: any = {};
	@Input() private config: any = {};

	private listeners = {};

	private PIVOTGRIDEVENTS = [
		'cellclick',
		'pivotdone',
		'pivotgroupcellclick'
	]
	private PIVOTGRIDPARAMETERS = [
		'this, td, cellIndex, record, tr, rowIndex, e, eOpts',
		'matrix,eOpts',
		'params, e, eOpts'
	]
	constructor(myElement: ElementRef, @Attribute('fit') fit: any) {
		
		super(myElement, fit);
		// create all the events generically. this is done generically so that
		// if the list of grid events change, we don't need to change this code.
		//this.ready = new EventEmitter();
		this['ready'] = new EventEmitter();
		let me = this;
		me.PIVOTGRIDEVENTS.forEach( (eventName, n) => {
			(<any>this)[eventName] = new EventEmitter();
			me.listeners[eventName] = function() {
					let parameters = me.PIVOTGRIDPARAMETERS[n];
					let parms = parameters.split(',');
					let args = Array.prototype.slice.call(arguments);
					let o: any = {};
					for (let i = 0, j = parms.length; i < j; i++ ) {
						if (parms[i] !== 'eOpts') {
							o[parms[i]] = args[i];
						}
					}
					me[eventName].next(o);
			};
		});
		//console.log(me.listeners);
	}

	public ngOnInit() {
		let me: any  = this;
		if (me.rootElement.childElementCount === 0 ) {
			let o: any = {
				xtype: 'pivotgrid',
				renderTo: me.rootElement
			};
			if (me.fit === true ) {o.plugins = ['fittoparent']; } else {o.height = 300; };
			o.listeners = me.listeners;
			if (me.title !== {} ) {o.title = me.title; };
			if (me.topAxis !== {} ) {o.topAxis = me.topAxis; };
			if (me.leftAxis !== {} ) {o.leftAxis = me.leftAxis; };
			if (me.aggregate !== {} ) {o.aggregate = me.aggregate; };
			o.store = me.store;
			if (me.config !== {} ) {
				Ext.apply(o, me.config);
			};
			me.extjsObject = Ext.create(o);
			me.ready.next(me);
		}
	}

}

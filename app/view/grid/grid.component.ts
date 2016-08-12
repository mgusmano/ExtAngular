import { Component, OnInit } from '@angular/core';
import {SalesStore} from '../../store/sales.store';

@Component({
  selector: 'my-grid',
	template: `
<div style="height:100%;width:100%;">
	<extjs-grid #theGridSales
		fit
		[(title)]="titleSales"
		[columns]= "columnsSales" 
		[selModel]="selModelSales"
		[plugins]="pluginsSales"
		[store]="storeSales"
		[config]="configSales"
		(select)="onGridSelectSales($event)"
		(selectionchange)="onGridSelectionChangeSales($event)"
		(beforecellclick)="onGridBeforeCellClickSales($event)"
		(enable)="onGridEnableSales($event)"
		(headerclick)="onGridGenericSales($event)"
	></extjs-grid>
</div>
	`
})
export class GridComponent {

	constructor () {
		this.gridSalesConstruct();
	}

	private titleSales: string;
	private columnsSales: any;
	private selModelSales: any;
	private pluginsSales: any;
	private storeSales: any;
	private configSales: any;
	private gridSalesConstruct() {
		this.titleSales = 'Sales';
		this.columnsSales = [
			{ text: 'Orderid', dataIndex: 'orderid' },
			{ text: 'Salesperson', width: 125, dataIndex: 'salesperson' },
			{ text: 'Amount', dataIndex: 'amount' },
			{ text: 'Country', width: 125, dataIndex: 'country' },
			{ text: 'Orderdate', width: 300, dataIndex: 'orderdate' },
			{ text: 'Person - range', width: 150, dataIndex: 'person-range' },
			{ text: 'Year', flex: 1, dataIndex: 'year' }
		];
		this.selModelSales = {
			//pruneRemoved: false,
			//type: 'spreadsheet',
			//columnSelect: true,
			//rowSelect: true
		};
		//this.storeSales = new SalesStore({}).extjsObject;

		this.pluginsSales = [{
			ptype: 'rowexpander',
			rowBodyTpl: [
				'{country}<br>',
				'{country:this.isGirl}<br>',
				'{country:this.isItReal}',
				'<br><span class="x-editable">{agencyName:htmlEncode}</span>',
				'<br><span class="x-editable">{c1:htmlEncode}</span>',
				'</div>',
				{
					isGirl: function(name){
						return name == 'United 2' || name == 'Nikol';
					},
					isItReal: function(name){
						return 'Real';
					}
				},
			]
    }];

		//this.storeSales = new SalesStore().extjsObject;

		this.storeSales = {
			autoLoad:   true,
			proxy: {
				type: 'ajax',
				url: 'data/sales.json',
				reader: {
					type: 'json',
					rootProperty: 'rows'
				}
			},
			filters: [
					function(item) {
							return item.get('year') >= 2012;
					}
			],
			fields: [
					{name: 'orderid',       type: 'int'},
					{name: 'salesperson',   type: 'string'},
					{name: 'country',       type: 'string'},
					{name: 'orderdate',     type: 'date', dateFormat: 'd/m/Y'},
					{name: 'amount',        type: 'int'},
					{
							name: 'person-range',
							convert: function(v, record){
									if(/^[a-j]/i.test(record.get('salesperson'))) return 'A-J';
									if(/^[k-s]/i.test(record.get('salesperson'))) return 'K-S';
									if(/^[t-z]/i.test(record.get('salesperson'))) return 'T-Z';
									return v;
							}
					},{
							name: 'year',
							convert: function(v, record){
									return Ext.Date.format(record.get('orderdate'), "Y");
							}
					}
			]
		};
		this.configSales = {
			style: { border: '10px solid white' },
			collapsible: true,
			animCollapse: false,
			columnLines: true,
			enableLocking: true,


			// margin: '0 0 5 0',
			// height: 400,
			// loadMask: true,
			// multiSelect: true,
			// viewConfig: {
			// 	trackOver: false,
			// 	emptyText: '<h1 style="margin:20px">No matching results</h1>'
			// }
		};
	}
	private onGridSelectSales(event) {
		console.log(event);
	}
	private onGridSelectionChangeSales(event) {
		console.log(event);
	}
	private onGridBeforeCellClickSales(event) {
		console.log('beforecellclick', event);
	}
	private onGridEnableSales(event) {
		console.log('enable', event);
	}
	private onGridGenericSales(event) {
		console.log('generic', event);
	}

}
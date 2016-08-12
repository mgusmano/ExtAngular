import { Component } from '@angular/core';
import { CompanyStore } from '../../store/company.store';

@Component({
	template: `
		<div style="height:100%;width:100%;">
		<extjs-grid #theGridSales
			fit
			[(title)]="title"
			[columns]= "columns" 
			[store]="store"
			[config]="config"
		></extjs-grid>
		</div>
	`
})
export class SimpleComponent {
	private title: string = 'Simple Grid';
	private columns: any;
	private store: any;
	private config: any;

	constructor () {
		//this.title = 'Simple Grid';
		this.columns = [
			{ text: 'Company', flex: 1, sortable: false, dataIndex: 'name' }, 
			{ text: 'Price', width: 95, sortable: true, formatter: 'usMoney', dataIndex: 'price' }
		];
		this.store = new CompanyStore({}).extjsObject;
		this.config = { style: { border: '10px solid #e9e9e9' } };
	}
}

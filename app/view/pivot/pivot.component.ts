import { Component } from '@angular/core';
import { SalesStore } from '../../store/sales.store';

@Component({
	template: `
		<div style="height:100%;width:100%;padding:0px;">

			<extjs-pivotgrid #thePivotGrid
				[leftAxis]="leftAxisPivotGrid" 
				[topAxis]="topAxisPivotGrid" 
				[leftAxis]="leftAxisPivotGrid" 
				[aggregate]="aggregatePivotGrid"
				[store]="storePivotGrid"
				[config]="configPivotGrid"
				(ready)="readyPivotGrid($event)"
				(pivotdone)="getChartDataFromGridData($event)"
			></extjs-pivotgrid>

		</div>
	`
})
export class PivotComponent {

	constructor () {
		this.pivotGridConstruct();
	}

	private thePivotGrid; any;
	private titlePivotGrid: string;
	private leftAxisPivotGrid: any;
	private topAxisPivotGrid: any;
	private aggregatePivotGrid: any;
	private storePivotGrid: any;
	private configPivotGrid: any;

	private pivotGridConstruct() {
		this.titlePivotGrid = 'Pivot Grid';
		//this.topAxisPivotGrid = [{	dataIndex: 'country', direction: 'ASC' }];
		//this.topAxisPivotGrid = [{ dataIndex: 'year', direction: 'ASC' }];
		this.topAxisPivotGrid = [];
		this.leftAxisPivotGrid = [
			{ width: 120, id: 'salesperson', dataIndex: 'salesperson', header: 'Salesperson' }
		];
		this.aggregatePivotGrid = [
			{ 
				measure: 'amount', header: 'Grand Total', dataIndex: 'amount', aggregator: 'sum', align: 'right', width: 135, 
				renderer: Ext.util.Format.numberRenderer('$0,000.00')
			}
		],
		this.storePivotGrid= new SalesStore({}).extjsObject;
		this.configPivotGrid = {
			style: { border: '10px solid #e9e9e9' },
			plugins: [{ ptype: 'pivotdrilldown' }],
			rowGrandTotalsPosition: 'none'
		};
	}

	readyPivotGrid(thePivotGrid) {
		this.thePivotGrid = thePivotGrid;
	}

	private getChartDataFromGridData(event) {
		// var xAxisChartCategories = [];
		// let chartSeriesStore: any = [];
		// var items = this.thePivotGrid.extjsObject.getPivotStore().data.items;
		// var columns = this.thePivotGrid.extjsObject.headerCt.getGridColumns();
		// var d: any;

		// items.forEach(function(item) {
		// 	xAxisChartCategories.push(item.data.salesperson);
		// });

		// columns.forEach(function(column) {
		// 	if(!column.leftAxis) {
		// 		d = [];
		// 		items.forEach(function(item) {
		// 			d.push(item.data[column.dataIndex]);
		// 		});
		// 		chartSeriesStore.push({ type: 'column', name: column.text, data: d });
		// 	}
		// });

		// this.doChartOptions(xAxisChartCategories,
		// 										chartSeriesStore);
	}



}
import { Component } from '@angular/core';
import { SalesStore } from '../../store/sales.store';

@Component({
	template: `
		<div style="height:100%;width:100%;">

			<div style="height:6%;width:100%;">
				<extjs [xtype]='"combo"' [config]='combo' ></extjs>
			</div>

			<div style="height:47%;width:100%;">
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

			<div style="height:47%;width:100%;">
				<extjs [xtype]='"cartesian"' fit [config]='cartesian' (ready)="readyCartesian($event)" ></extjs>
			</div>

		</div>
	`
})
export class AnalyzeComponent {
	private combo: any;

	private theCartesian: any;
	private cartesian: any;

	private thePivotGrid; any;
	private titlePivotGrid: string;
	private leftAxisPivotGrid: any;
	private topAxisPivotGrid: any;
	private aggregatePivotGrid: any;
	private storePivotGrid: any;
	private configPivotGrid: any;

	constructor () {
		this.comboConstruct();
		this.pivotGridConstruct();
		this.cartesianConstruct()
	}

	private comboConstruct() {
		this.combo = { 
			style: { border: '10px solid white' },
			height: 20,
			width: '100%',
			fieldLabel:'Select report',
			displayField: 'text',
			valueField: 'value',
			value: 'By Country',
			flex: 1,
			editable: false,
			store: { 
				fields: ['value', 'text'],
				data: [
					{ value: 'By Country', text: 'What are the order amounts of each salesperson in a specific country?' },
					{ value: 'By Year', text: 'How did salespeople perform in a specific year?' },
					{ value: 'Total', text: 'What are the order amounts of each salesperson?' }
				]
			},
			listeners: {
				scope: this,
				change: this.onReportComboChange
			}
		};
	}

	private cartesianConstruct() {
		this.cartesian = { 
			border: false,
			style: { border: '10px solid white' },
			interactions: ['itemhighlight'],
			legend2: {
				//type: 'dom',
				frame: true,
				docked: 'top', 
				border: 5,
				style: {
						borderColor: 'red',
						borderStyle: 'solid'
				}
			},
        legend: {
            type: 'sprite',
            docked: 'top',
            marker: {
                type: 'square'
            },
            border: {
                radius: 10
            }
        },




			series: { 
				id: '1', 
				type: 'bar', 
				stacked: false,
				xField: 'salesperson',
				yField: 'c1', 
				//yField: xAxisChartCategoriesFields, 
				title: 'c1'
				//title: xAxisChartCategoriesTitles, 
				//label: { field: xAxisChartCategoriesFields } 
			},

			axes: [
				{
					type:       'category',
					fields:     ['salesperson'],
					position:   'bottom'
				},
				{
					type:       'numeric',
					position:   'left',
					majorTickSteps: 5,
					renderer: function (axis, label, layoutContext) {
						var value = layoutContext.renderer(label) / 1000;
						return value === 0 ? '$0' : Ext.util.Format.number(value, '$0K');
					},
					grid: {
						odd: { fillStyle: 'rgba(255, 255, 255, 0.06)' },
						even: { fillStyle: 'rgba(0, 0, 0, 0.03)' }
					}
				}
			]
		}
	}

	private pivotGridConstruct() {
		this.titlePivotGrid = 'Pivot Grid';
		this.topAxisPivotGrid = [
		];
		//this.topAxisPivotGrid = [{	dataIndex: 'country', direction: 'ASC' }];
		//this.topAxisPivotGrid = [{ dataIndex: 'year', direction: 'ASC' }];
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
			style: { border: '10px solid white' },
			plugins: [{ ptype: 'pivotdrilldown' }],
			rowGrandTotalsPosition: 'none'
		};
	}

	private onReportComboChange(combo, newValue, oldValue, eOpts) {
		var topAxis = {};
		switch(newValue){
			case 'By Country':
				topAxis = { topAxis: [{	dataIndex: 'country', direction: 'ASC' }] };
				break;
			case 'By Year':
				topAxis = { topAxis: [{ dataIndex: 'year', direction: 'ASC' }] };
				break;
			case 'Total':
				topAxis = {	topAxis: [] };
				break;
		}
		this.thePivotGrid.extjsObject.reconfigurePivot(topAxis);
		// this.chartlabel.setText(newValue);
	};

	private getChartDataFromGridData(event) {
		var xAxisChartCategoriesFields = []; 
		var xAxisChartCategoriesTitles = [];
		var chartSeriesStore;
		var columns = this.thePivotGrid.extjsObject.headerCt.getGridColumns();
		
		columns.forEach(function(column) {
			if(!column.leftAxis) {
				xAxisChartCategoriesFields.push(column.dataIndex);
				xAxisChartCategoriesTitles.push(column.text);
			}
		});
		chartSeriesStore = this.thePivotGrid.extjsObject.getPivotStore();
		this.doChartOptions(xAxisChartCategoriesFields, xAxisChartCategoriesTitles, chartSeriesStore);
	}

	private doChartOptions(xAxisChartCategoriesFields, xAxisChartCategoriesTitles, chartSeriesStore) {
		var array: any = chartSeriesStore.data.items;
		var data:any = [];
		var storeFields:any = [];
		chartSeriesStore.data.items.forEach(function(arrayItem) {
				var o:any = {};
				o.salesperson = arrayItem.data.salesperson;
				storeFields.push('salesperson');
				xAxisChartCategoriesFields.forEach(function(field) {
					o[field] = arrayItem.data[field];
					storeFields.push(field);
				});
				data.push(o);
		});

		var	store:any = {
			fields: storeFields,
			data: data
		}

		var chart = this.theCartesian.extjsObject;
		//chart.axes[1].setFields(xAxisChartCategoriesFields);
		console.log(xAxisChartCategoriesTitles);
		var series = { 
			id: '1', 
			type: 'line', 
			stacked: false,
			xField: 'salesperson',
			//yField: 'c1' 
			yField: xAxisChartCategoriesFields, 
			//title: xAxisChartCategoriesTitles, 
			//label: { field: xAxisChartCategoriesFields } 
		};

		//chart.removeSeries('1');
		chart.addSeries(series);
		chart.setStore(store);
		//chart.setStore(chartSeriesStore);
	}

	readyPivotGrid(thePivotGrid) {
		this.thePivotGrid = thePivotGrid;
	}

	readyCartesian(theCartesian) {
		this.theCartesian = theCartesian;
	}

}
import { Component } from '@angular/core';

@Component({
	template: `
		<div style="height:100%;width:100%;">
			<extjs [xtype]='"cartesian"' fit 
				[config]='cartesian'
				(ready)="readyCartesian($event)"
			></extjs>
		</div>
	`
})
export class BasicChartComponent {
	private theCartesian: any;
	private cartesian: any;

	constructor () {
		this.cartesianConstruct()
	}

	private cartesianConstruct() {
		this.cartesian = { 
			style: { border: '10px solid lightgray' },
			legend: { docked: 'bottom' },

			series: [
				{
						type: 'line',
						xField: 'month',
						yField: 'data1',
						style: {
								lineWidth: 2
						},
						marker: {
								radius: 4,
								lineWidth: 2
						},
						label: {
								field: 'data1',
								display: 'over'
						},
						highlight: {
								fillStyle: '#000',
								radius: 5,
								lineWidth: 2,
								strokeStyle: '#fff'
						},
						tooltip: {
								trackMouse: true,
								showDelay: 0,
								dismissDelay: 0,
								hideDelay: 0,
								renderer: function (tooltip, record, item) {
									tooltip.setHtml(record.get('month') + ': ' + record.get('data1') + '%');
								}
						}
				}
			],

			axes: [
				{
					type: 'numeric',
					position: 'left',
					grid: true,
					minimum: 0,
					maximum: 24,
					renderer: function (axis, label, layoutContext) {
						return layoutContext.renderer(label) + '%';
					},
				}, 
				{
					type: 'category',
					position: 'bottom',
					grid: true,
					label: {
							rotate: {
									degrees: -45
							}
					}
				}
			],

			store: {
				fields: ['month', 'data1', 'data2', 'data3', 'data4', 'other'],
				data: [
							{ month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4, other: 4 },
							{ month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5, other: 2 },
							{ month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4, other: 4 },
							{ month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5, other: 3 },
							{ month: 'May', data1: 18, data2: 35, data3: 39, data4: 4, other: 4 },
							{ month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4, other: 3 },
							{ month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4, other: 3 },
							{ month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4, other: 3 },
							{ month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4, other: 4 },
							{ month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4, other: 3 },
							{ month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4, other: 4 },
							{ month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4, other: 3 }
					]
			}
		}
	}
	readyCartesian(theCartesian) {
		this.theCartesian = theCartesian;
	}

}
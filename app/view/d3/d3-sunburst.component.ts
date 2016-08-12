import { Component } from '@angular/core';

@Component({
	template: `
		<div style="height:100%;width:100%;">
			<extjs [xtype]='"d3-sunburst"' fit [config]='d3Config' ></extjs>
		</div>
	`
})
export class D3SunburstComponent {
	private d3Config: any;

	constructor () {
		this.d3Config = {
			xtype: 'd3-sunburst',
			padding: 20,
			height: '100%',
			store: {
				type: 'tree',
				rootVisible: true,
				autoLoad: true,
				fields: [
						'name',
						'path',
						'size',
						{
								name: 'leaf',
								calculate: function (data) {
										return data.root ? false : !data.children;
								}
						},
						{
								name: 'text',
								calculate: function (data) {
										return data.name;
								}
						}
				],
				proxy: {
						type: 'ajax',
						url: 'data/tree.json'
				},
				idProperty: 'path'
			},
			tooltip: {
					renderer: 'onTooltip'
			}
		}
	}
}






			// zoom: {
			// 	doubleTap: false
			// },
			// store: {
			// 	type: 'tree',
			// 	fields: [
			// 		'name',
			// 		'description',
			// 		'cap',
			// 		{
			// 			name: 'leaf',
			// 			calculate: function (data) {
			// 					return data.root ? false : !data.children;
			// 			}
			// 		},
			// 		{
			// 			name: 'change',
			// 			calculate: function () {
			// 					return (-5 + Math.random() * 10).toFixed(2); // percentages
			// 			}
			// 		},
			// 		{
			// 			name: 'expanded',
			// 			type: 'boolean',
			// 			defaultValue: true
			// 		}
			// 	],
			// 	proxy: {
			// 		type: 'ajax',
			// 		url: 'data/stocks.json'
			// 	},
			// 	autoLoad: true
			// },
			// rootVisible: false,
			// selectEventName: null,
			// expandEventName: null,
			// nodeValue: function (node) {
			// 	return node.data.cap;
			// },
			// tooltip: {
			// 	cls: 'tip',
			// 	renderer: 'onTooltip'
			// },
			// colorAxis: {
			// 	scale: {
			// 		type: 'linear',
			// 		domain: [-5, 0, 5],
			// 		range: ['#E45649', '#ECECEC', '#50A14F']
			// 	},
			// 	field: 'change',
			// 	processor: function (axis, scale, node, field) {
			// 		return node.isLeaf() ? scale(node.data[field]) : '#ececec';
			// 	}
			// }
import { Component, OnInit } from '@angular/core';
import { ExtJSGrid } from '../../extangular/extjs.grid';
import { CompanyStore } from '../../store/company.store';

@Component({
  selector: 'my-grid',
	directives: [ExtJSGrid],
  styleUrls: ['/app/view/grid/basic.component.css'],
	template: `
<div style="height:100%;width:100%;">
	<extjs-grid #theGridSales
		fit
		[(title)]="title"
		[columns]= "columns" 
		[config]="config"
		[store]="store"
	></extjs-grid>
</div>
`
})
export class BasicComponent {
	private title: string;
	private config: any;
	private columns: any;
	private store: any;

	private getBuyClass(v, meta, rec) {
			if (rec.get('change') < 0) {
					return 'array-grid-alert-col';
			} else {
					return 'array-grid-buy-col';
			}
	};

	private getBuyTip(v, meta, rec) {
			if (rec.get('change') < 0) {
					return 'Hold stock';
			} else {
					return 'Buy stock';
			}
	};

	private onBuyClick(grid, rowIndex, colIndex) {
			var rec = grid.getStore().getAt(rowIndex),
					action = (rec.get('change') < 0 ? 'Hold' : 'Buy');

			Ext.Msg.alert(action, action + ' ' + rec.get('name'));
	};

	private onSellClick(grid, rowIndex, colIndex) {
			var rec = grid.getStore().getAt(rowIndex);
			Ext.Msg.alert('Sell', 'Sell ' + rec.get('name'));
	};

	// private onToggleTrading(btn, pressed) {
	// 		var view = this.view;

	// 		if (pressed) {
	// 				view.getAction('buy').disable();
	// 				view.getAction('sell').disable();
	// 				btn.setText('Resume Trading');
	// 		} else {
	// 				view.getAction('buy').enable();
	// 				view.getAction('sell').enable();
	// 				btn.setText('Suspend Trading');
	// 		}
	// };

	//renderChange: function (value) {
	private renderChange(value, metaData, record, rowIndex, colIndex, store, view) {
			return this.renderSign(value, '0.00', view.grid);
	};

	private renderPercent(value, metaData, record, rowIndex, colIndex, store, view) {
			return this.renderSign(value, '0.00%', view.grid);
	};

	//renderSign: function (value, format, grid) {
	private renderSign(value, format, grid) {
			var text = Ext.util.Format.number(value, format),
					tpl = grid.signTpl,
					data = grid.data;

			if (Math.abs(value) > 0.1) {
					if (!tpl) {
							grid.signTpl = tpl = grid.getView().lookupTpl('signTpl');
							grid.data = data = {};
					}

					data.value = value;
					data.text = text;

					text = tpl.apply(data);
			}

			return text;
	};

	constructor () {
		this.title = 'Basic Grid';

		this.config = {
			stateful: true,
			collapsible: true,
			multiSelect: true,
			stateId: 'stateGrid',
			headerBorders: false,
			//signTpl: '<span style="' +
			//				'color:{value:sign(\'#cf4c35\',\'#73b51e\')}"' +
			//		'>{text}</span>',
			viewConfig: {
					signTpl: '<span style="color:{value:sign(\'#cf4c35\',\'#73b51e\')}">{text}</span>',
					enableTextSelection: true
			},
			// Reusable actions
			actions: {
					sell: {
							scope: this,
							iconCls: 'array-grid-sell-col',
							tooltip: 'Sell stock',
							handler: this.onSellClick
					},
					buy: {
							scope: this,
							getClass: this.getBuyClass,
							getTip: this.getBuyTip,
							handler: this.onBuyClick
					},
					suspendTrading: {
							tooltip: 'Toggles enabled status of all buy and sell actions anywhere in this view',
							text: 'Suspend Trading',
							glyph: 'xf256@FontAwesome',
							toggleHandler: 'onToggleTrading',
							enableToggle: true
					}
			}
		};

		this.columns = [
			{ text: 'Company', flex: 1, sortable: false, dataIndex: 'name' }, 
			{ text: 'Price', width: 95, sortable: true, formatter: 'usMoney', dataIndex: 'price' }, 
			{ text: 'Change', width: 80, sortable: true, dataIndex: 'change', scope: this, renderer: this.renderChange, }, //renderer: 'renderChange', 
			{ text: '% Change', width: 100, sortable: true, dataIndex: 'pctChange', scope: this, renderer: 'renderPercent' }, 
			{ text: 'Last Updated', width: 115, sortable: true, formatter: 'date("m/d/Y")', dataIndex: 'lastChange' }, 
			{
					menuDisabled: true,
					sortable: false,
					xtype: 'actioncolumn',
					width: 50,
					items: ['@sell', '@buy']
			}
		];
		//this.store = new CompanyStore().extjsObject;
		this.store = new CompanyStore({}).extjsObject;
	}

}
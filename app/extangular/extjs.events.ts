export class ExtJSEvents {
	public static grid = [ 
		{ name: 'select', parameters: 'this,record,index,eOpts' },
		{ name: 'selectionchange', parameters: 'this,selected,eOpts' },
		{ name: 'beforecellclick', parameters: 'this,td,cellIndex,record,tr,rowIndex,e,eOpts' },
		{ name: 'enable', parameters: 'this,eOpts' },
		{ name: 'headerclick', parameters: 'ct,column,e,t,eOpts' },
	];
	public static panel = [ 
		{ name: 'select', parameters: 'this,record,index,eOpts' },
		{ name: 'selectionchange', parameters: 'this,selected,eOpts' },
		{ name: 'beforecellclick', parameters: 'this,td,cellIndex,record,tr,rowIndex,e,eOpts' },
		{ name: 'enable', parameters: 'this,eOpts' },
		{ name: 'headerclick', parameters: 'ct,column,e,t,eOpts' },
	];
}

//import {ExtJSGridEvents} from './extjs.grid.events';
import {Utils as _} from './utils';

export class ExtJSUtil {

	// all the events are populated in here AFTER this class (at the bottom of the file).
	public static EVENTS: string[] = [];
	public static PARAMETERS: string[] = [];

	//public static PIVOTGRIDEVENTS: string[] = [];
	//public static PIVOTGRIDPARAMETERS: string[] = [];


	// function below fills this with onXXX methods, based on the above events
	public static EVENT_CALLBACKS: string[];

	public static STRING_PROPERTIES = [
		'sortingOrder', 'rowClass', 'rowSelection', 'overlayLoadingTemplate',
		'overlayNoRowsTemplate', 'headerCellTemplate', 'quickFilterText', 'rowModelType'];

	public static OBJECT_PROPERTIES = [
		'rowStyle', 'context', 'groupColumnDef', 'localeText', 'icons', 'datasource'
	];

	public static ARRAY_PROPERTIES = [
		'slaveGrids', 'rowData', 'floatingTopRowData', 'floatingBottomRowData', 'columnDefs'
	];

	public static NUMBER_PROPERTIES = [
		'rowHeight', 'rowBuffer', 'colWidth', 'headerHeight', 'groupDefaultExpanded', 'minColWidth', 'maxColWidth'
	];

	public static BOOLEAN_PROPERTIES = [
			'toolPanelSuppressGroups', 'toolPanelSuppressValues',
			'suppressRowClickSelection', 'suppressCellSelection', 'suppressHorizontalScroll', 'debug',
			'enableColResize', 'enableCellExpressions', 'enableSorting', 'enableServerSideSorting',
			'enableFilter', 'enableServerSideFilter', 'angularCompileRows', 'angularCompileFilters',
			'angularCompileHeaders', 'groupSuppressAutoColumn', 'groupSelectsChildren', 'groupHideGroupColumns',
			'groupIncludeFooter', 'groupUseEntireRow', 'groupSuppressRow', 'groupSuppressBlankHeader', 'forPrint',
			'suppressMenuHide', 'rowDeselection', 'unSortIcon', 'suppressMultiSort', 'suppressScrollLag',
			'singleClickEdit', 'suppressLoadingOverlay', 'suppressNoRowsOverlay', 'suppressAutoSize',
			'suppressParentsInRowNodes', 'showToolPanel', 'suppressColumnMoveAnimation', 'suppressMovableColumns',
			'suppressFieldDotNotation', 'enableRangeSelection', 'suppressEnterprise', 'rowGroupPanelShow',
			'suppressContextMenu', 'suppressMenuFilterPanel', 'suppressMenuMainPanel', 'suppressMenuColumnPanel',
			'enableStatusBar', 'rememberGroupStateWhenNewData'
	];

	public static FUNCTION_PROPERTIES = ['headerCellRenderer', 'localeTextFunc', 'groupRowInnerRenderer',
			'groupRowRenderer', 'groupAggFunction', 'isScrollLag', 'isExternalFilterPresent', 'getRowHeight',
			'doesExternalFilterPass', 'getRowClass', 'getRowStyle', 'getHeaderCellTemplate', 'traverseNode',
			'getContextMenuItems', 'getMainMenuItems', 'processRowPostCreate', 'processCellForClipboard'];

	public static ALL_PROPERTIES = ExtJSUtil.ARRAY_PROPERTIES
			.concat(ExtJSUtil.OBJECT_PROPERTIES)
			.concat(ExtJSUtil.STRING_PROPERTIES)
			.concat(ExtJSUtil.NUMBER_PROPERTIES)
			.concat(ExtJSUtil.FUNCTION_PROPERTIES)
			.concat(ExtJSUtil.BOOLEAN_PROPERTIES);

	public static getEventCallbacks(): string[] {
			if (!ExtJSUtil.EVENT_CALLBACKS) {
					ExtJSUtil.EVENT_CALLBACKS = [];
					ExtJSUtil.EVENTS.forEach( (eventName: string) => {
							ExtJSUtil.EVENT_CALLBACKS.push(ExtJSUtil.getCallbackForEvent(eventName));
					});
			}
			return ExtJSUtil.EVENT_CALLBACKS;
	}

	// public static copyAttributesToGridOptions(gridOptions: GridOptions, component: any): GridOptions {
	//     checkForDeprecated(component);
	//     // create empty grid options if none were passed
	//     if (typeof gridOptions !== 'object') {
	//         gridOptions = <GridOptions> {};
	//     }
	//     // to allow array style lookup in TypeScript, take type away from 'this' and 'gridOptions'
	//     let pGridOptions = <any>gridOptions;
	//     // add in all the simple properties
	//     ExtJSUtil.ARRAY_PROPERTIES
	//         .concat(ExtJSUtil.STRING_PROPERTIES)
	//         .concat(ExtJSUtil.OBJECT_PROPERTIES)
	//         .concat(ExtJSUtil.FUNCTION_PROPERTIES)
	//         .forEach( (key)=> {
	//         if (typeof (component)[key] !== 'undefined') {
	//             pGridOptions[key] = component[key];
	//         }
	//     });
	//     ExtJSUtil.BOOLEAN_PROPERTIES.forEach( (key)=> {
	//         if (typeof (component)[key] !== 'undefined') {
	//             pGridOptions[key] = ExtJSUtil.toBoolean(component[key]);
	//         }
	//     });
	//     ExtJSUtil.NUMBER_PROPERTIES.forEach( (key)=> {
	//         if (typeof (component)[key] !== 'undefined') {
	//             pGridOptions[key] = ExtJSUtil.toNumber(component[key]);
	//         }
	//     });
	//     ExtJSUtil.getEventCallbacks().forEach( (funcName) => {
	//         if (typeof (component)[funcName] !== 'undefined') {
	//             pGridOptions[funcName] = component[funcName];
	//         }
	//     });

	//     return gridOptions;
	// }

	public static getCallbackForEvent(eventName: string): string {
			if (!eventName || eventName.length < 2) {
					return eventName;
			} else {
					return 'on' + eventName[0].toUpperCase() + eventName.substr(1);
			}
	}

	// // change this method, the caller should know if it's initialised or not, plus 'initialised'
	// // is not relevant for all component types.
	// // maybe pass in the api and columnApi instead???
	// public static processOnChange(changes: any, gridOptions: GridOptions, api: GridApi): void {
	//     //if (!component._initialised || !changes) { return; }
	//     if (!changes) { return; }

	//     checkForDeprecated(changes);

	//     // to allow array style lookup in TypeScript, take type away from 'this' and 'gridOptions'
	//     let pGridOptions = <any> gridOptions;

	//     // check if any change for the simple types, and if so, then just copy in the new value
	//     ComponentUtil.ARRAY_PROPERTIES
	//         .concat(ComponentUtil.OBJECT_PROPERTIES)
	//         .concat(ComponentUtil.STRING_PROPERTIES)
	//         .forEach( (key)=> {
	//         if (changes[key]) {
	//             pGridOptions[key] = changes[key].currentValue;
	//         }
	//     });
	//     ComponentUtil.BOOLEAN_PROPERTIES.forEach( (key)=> {
	//         if (changes[key]) {
	//             pGridOptions[key] = ComponentUtil.toBoolean(changes[key].currentValue);
	//         }
	//     });
	//     ComponentUtil.NUMBER_PROPERTIES.forEach( (key)=> {
	//         if (changes[key]) {
	//             pGridOptions[key] = ComponentUtil.toNumber(changes[key].currentValue);
	//         }
	//     });
	//     ComponentUtil.getEventCallbacks().forEach( (funcName)=> {
	//         if (changes[funcName]) {
	//             pGridOptions[funcName] = changes[funcName].currentValue;
	//         }
	//     });

	//     if (changes.showToolPanel) {
	//         api.showToolPanel(changes.showToolPanel.currentValue);
	//     }

	//     if (changes.quickFilterText) {
	//         api.setQuickFilter(changes.quickFilterText.currentValue);
	//     }

	//     if (changes.rowData) {
	//         api.setRowData(changes.rowData.currentValue);
	//     }

	//     if (changes.floatingTopRowData) {
	//         api.setFloatingTopRowData(changes.floatingTopRowData.currentValue);
	//     }

	//     if (changes.floatingBottomRowData) {
	//         api.setFloatingBottomRowData(changes.floatingBottomRowData.currentValue);
	//     }

	//     if (changes.columnDefs) {
	//         api.setColumnDefs(changes.columnDefs.currentValue);
	//     }

	//     if (changes.datasource) {
	//         api.setDatasource(changes.datasource.currentValue);
	//     }

	//     if (changes.headerHeight) {
	//         api.setHeaderHeight(changes.headerHeight.currentValue);
	//     }
	// }

	public static toBoolean(value: any): boolean {
			if (typeof value === 'boolean') {
					return value;
			} else if (typeof value === 'string') {
					// for boolean, compare to empty String to allow attributes appearing with
					// not value to be treated as 'true'
					return value.toUpperCase() === 'TRUE' || value === '';
			} else {
					return false;
			}
	}

	public static toNumber(value: any): number {
			if (typeof value === 'number') {
					return value;
			} else if (typeof value === 'string') {
					return Number(value);
			} else {
					return undefined;
			}
	}
}

// _.iterateObject(ExtJSGridEvents, function(key, value) {
// 	//debugger;
// 	let array = value.split(',');
// 	let event = array[0];
// 	let n = value.indexOf(',');
// 	let parameters = value.substring(n + 1);
// 	ExtJSUtil.EVENTS.push(event);
// 	ExtJSUtil.PARAMETERS.push(parameters);
// });

// _.iteratePivotGridObject(ExtJSPivotGridEvents, function(key, value) {
// 	debugger;
// 	let array = value.split(',');
// 	let event = array[0];
// 	let n = value.indexOf(',');
// 	let parameters = value.substring(n + 1);
// 	ExtJSUtil.PIVOTGRIDEVENTS.push(event);
// 	ExtJSUtil.PIVOTGRIDPARAMETERS.push(parameters);
// });


function checkForDeprecated(changes: any): void {
	if (changes.ready || changes.onReady) {
			console.warn('ag-grid: as of v3.3 ready event is now called gridReady, so the callback should be onGridReady');
	}
	if (changes.rowDeselected || changes.onRowDeselected) {
			console.warn('ag-grid: as of v3.4 rowDeselected no longer exists. Please check the docs.');
	}
}

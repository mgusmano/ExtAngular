import { Component } from '@angular/core';
import { ClimateStore } from '../../store/climate.store';

@Component({
	template: `
		<div style="height:100%;width:100%;">
		<extjs [xtype]='"calendar"'
			fit
			[config]='config'
			(click)='onButtonClickHello($event);'
		></extjs>
		</div>
	`
})
export class BasicCalendarComponent {
	config: any = { 
		xtype: 'calendar',
		style: { border: '10px solid white' },
		views: {
				day: {
						startTime: 6,
						endTime: 22
				},
				workweek: {
						xtype: 'calendar-week',
						controlStoreRange: false,
						titleTpl: '{start:date("j M")} - {end:date("j M")}',
						label: 'Work Week',
						weight: 15,
						dayHeaderFormat: 'D d',
						firstDayOfWeek: 1,
						visibleDays: 5
				}
		},
		timezoneOffset: 0,
		// store: {
		// 		autoLoad: true,
		// 		proxy: {
		// 				type: 'ajax',
		// 				url: '/KitchenSink/CalendarFull'
		// 		}
		// }
	};
	onButtonClickHello(event) {
		console.log(event);
		event.stopPropagation();
	}
}
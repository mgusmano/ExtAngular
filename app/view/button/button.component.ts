import { Component } from '@angular/core';

@Component({
	selector: 'my-button',
	template: `
		<extjs2></extjs2>
		<extjs [xtype]='"button"'
			[config]='theConfig'
			(click)='onButtonClickHello($event);'
		></extjs>
		<extjs-button
			[text]='buttonTitle'
			(click)='onButtonClickHello($event);'
		></extjs-button>
	`
})
export class ButtonComponent {
	theConfig: any = { text: 'hello' };
	onButtonClickHello(event) {
		console.log(event);
		event.stopPropagation();
	}
	buttonTitle: any = 'hi';
}

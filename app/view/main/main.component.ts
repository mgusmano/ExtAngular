import { Component } from '@angular/core';
//import { provideRouter, RouterConfig }  from '@angular/router';
//import { ROUTER_DIRECTIVES } from '@angular/router';
//import '../../rxjs-extensions';

@Component({
  selector: 'my-app',
	template: `
		<div>
			<div class="top"><div class="header">Using Sencha Ext JS Controls in an Angular2 Application</div></div>
			<div class="left"><navigation></navigation></div>
			<div class="center"><router-outlet></router-outlet></div>
			<div class="bottom"><div class="footer">Copyright 2016 Sencha</div></div>
		</div>
	`
})
export class MainComponent { }

// <div class="right"><detail></detail></div>

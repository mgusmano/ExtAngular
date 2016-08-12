import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }               from './in-memory-data.service';

import { MainComponent }  from './view/main/main.component';
import { NavigationComponent } from './view/main/navigation.component';
//import { DetailComponent } from './detail.component';
import { routing }        from './app.routing';

import { GridComponent } from './view/grid/grid.component';
import { BasicComponent } from './view/grid/basic.component';
import { SimpleComponent } from './view/grid/simple.component';
import { ButtonComponent } from './view/button/button.component';
import { BasicChartComponent } from './view/chart/basic-chart.component';
import { BasicCalendarComponent } from './view/calendar/basic-calendar.component';
import { AnalyzeComponent } from './view/analyze/analyze.component';
import { PivotComponent } from './view/pivot/pivot.component';

import { ExtJS2 } from './extangular/extjs2';
import { ExtJS } from './extangular/extjs';
import { ExtJSButton } from './extangular/extjs.button';
import { ExtJSGrid } from './extangular/extjs.grid';
import { ExtJSPivotGrid } from './extangular/extjs.pivotgrid';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ], 
  declarations: [ 
		MainComponent, NavigationComponent, 
		GridComponent, BasicComponent, SimpleComponent, ButtonComponent, BasicCalendarComponent,
		BasicChartComponent, AnalyzeComponent, PivotComponent, 
		ExtJS2, ExtJS, ExtJSButton, ExtJSGrid, ExtJSPivotGrid 
	],
  // providers: [
  //   HeroService,
  //   { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
  //   { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
  // ],
  bootstrap:    [ MainComponent ]
})
export class AppModule { }
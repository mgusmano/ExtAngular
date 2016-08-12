import { enableProdMode }                    from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Routes, RouterModule } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }               from './in-memory-data.service';

// import { ExtJS2 } from './extangular/extjs2';
import { ExtJS } from './extangular/extjs';
// import { ExtJSButton } from './extangular/extjs.button';
// import { ExtJSGrid } from './extangular/extjs.grid';
// import { ExtJSPivotGrid } from './extangular/extjs.pivotgrid';

import { MainMComponent }  from './view/main/mainm.component';

// import { MainComponent }  from './view/main/main.component';
// import { NavigationComponent } from './view/main/navigation.component';

// import { GridComponent } from './view/grid/grid.component';
// import { BasicComponent } from './view/grid/basic.component';
// import { SimpleComponent } from './view/grid/simple.component';
// import { ButtonComponent } from './view/button/button.component';
// import { BasicChartComponent } from './view/chart/basic-chart.component';
// import { BasicCalendarComponent } from './view/calendar/basic-calendar.component';
// import { AnalyzeComponent } from './view/analyze/analyze.component';
// import { PivotComponent } from './view/pivot/pivot.component';
// import { D3TreeMapComponent } from './view/d3/d3-treemap.component';
// import { D3SunburstComponent } from './view/d3/d3-sunburst.component';

// const appRoutes: Routes = [
// 	{ path: '', redirectTo: '/simple', pathMatch: 'full' },
// 	{ path: 'grid', component: GridComponent },
// 	{ path: 'basic', component: BasicComponent },
// 	{ path: 'analyze', component: AnalyzeComponent },
// 	{ path: 'pivot', component: PivotComponent },
// 	{ path: 'd3treemap', component: D3TreeMapComponent },
// 	{ path: 'd3sunburst', component: D3SunburstComponent },
// 	{ path: 'simple', component: SimpleComponent },
// 	{ path: 'button', component: ButtonComponent },
// 	{ path: 'basicchart', component: BasicChartComponent },
// 	{ path: 'basiccalendar', component: BasicCalendarComponent },
// ];

// export const routing = RouterModule.forRoot(appRoutes);

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ], 
  declarations: [ MainMComponent, ExtJS ],
  bootstrap:    [ MainMComponent ]
})
export class AppModuleM { }

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModuleM);

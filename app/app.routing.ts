import { Routes, RouterModule } from '@angular/router';

import { GridComponent } from './view/grid/grid.component';
import { BasicComponent } from './view/grid/basic.component';
import { SimpleComponent } from './view/grid/simple.component';
import { ButtonComponent } from './view/button/button.component';
import { BasicChartComponent } from './view/chart/basic-chart.component';
import { BasicCalendarComponent } from './view/calendar/basic-calendar.component';
import { AnalyzeComponent } from './view/analyze/analyze.component';
import { PivotComponent } from './view/pivot/pivot.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/simple', pathMatch: 'full' },
	{ path: 'grid', component: GridComponent },
	{ path: 'basic', component: BasicComponent },
	{ path: 'analyze', component: AnalyzeComponent },
	{ path: 'pivot', component: PivotComponent },
	{ path: 'simple', component: SimpleComponent },
	{ path: 'button', component: ButtonComponent },
	{ path: 'basicchart', component: BasicChartComponent },
	{ path: 'basiccalendar', component: BasicCalendarComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
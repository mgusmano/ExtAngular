import { enableProdMode }                    from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);

//AoT
//import {platformBrowser} from ‘@angular/platform-browser’
//import {MyAppModuleNgFactory} from ‘./app.ngfactory’ //generated code
//platformBrowser().bootstrapModuleFactory(MyAppModuleNgFactory);
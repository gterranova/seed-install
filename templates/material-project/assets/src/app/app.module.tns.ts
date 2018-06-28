// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// vendor dependencies
// app
import { Config } from './common/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

import { AppComponent } from './app.component';
import { SHARED_MODULES, SHARED_EXPORTS } from './app.common';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
			'fa': './fonts/fontawesome.css'
		}),
        ...SHARED_MODULES,
    ],
    declarations: [
        AppComponent,
    ],
    exports: [
        ...SHARED_EXPORTS
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

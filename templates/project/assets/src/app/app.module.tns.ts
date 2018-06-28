import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
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
        ...SHARED_MODULES
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

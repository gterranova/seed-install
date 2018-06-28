import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// vendor dependencies
// app
import { Config } from './common/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

import { AppComponent } from './app.component';
import { SHARED_MODULES, SHARED_EXPORTS } from './app.common';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ...SHARED_MODULES,
        MaterialModule,
    ],
    exports: [
        ...SHARED_EXPORTS
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}

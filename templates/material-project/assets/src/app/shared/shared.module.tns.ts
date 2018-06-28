import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TNSFontIconModule
    ],
    declarations: [],
    exports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TNSFontIconModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
    ],
    declarations: [],
    exports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }

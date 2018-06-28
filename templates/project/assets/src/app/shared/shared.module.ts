import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Uncomment to add angular material support
// import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        // MaterialModule
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        // MaterialModule
    ]
})
export class SharedModule { }

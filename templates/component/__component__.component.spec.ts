import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

import { {{properCase component-name}}Component } from './{{dashCase component-name}}.component';

describe('{{properCase component-name}}Component', () => {
    let component: {{properCase component-name}}Component;
    let fixture: ComponentFixture<{{properCase component-name}}Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                {{properCase component-name}}Component,
                MockTranslatePipe
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent({{properCase component-name}}Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});

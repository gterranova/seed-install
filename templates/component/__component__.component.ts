import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-{{dashCase component-name}}',
    templateUrl: './{{dashCase component-name}}.component.html',
    styleUrls: ['./{{dashCase component-name}}.component.scss']
})
export class {{properCase component-name}}Component implements OnInit {

    constructor() { }

    ngOnInit() { }

}

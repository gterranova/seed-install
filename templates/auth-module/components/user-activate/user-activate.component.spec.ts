import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivateComponent } from './user-activate.component';

describe('UserActivateComponent', () => {
  let component: UserActivateComponent;
  let fixture: ComponentFixture<UserActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneQueryComponent } from './phone-query.component';

describe('PhoneQueryComponent', () => {
  let component: PhoneQueryComponent;
  let fixture: ComponentFixture<PhoneQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

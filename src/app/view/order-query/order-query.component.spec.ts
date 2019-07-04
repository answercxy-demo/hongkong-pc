import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQueryComponent } from './order-query.component';

describe('OrderQueryComponent', () => {
  let component: OrderQueryComponent;
  let fixture: ComponentFixture<OrderQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

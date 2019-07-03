import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeOnStageComponent } from './come-on-stage.component';

describe('ComeOnStageComponent', () => {
  let component: ComeOnStageComponent;
  let fixture: ComponentFixture<ComeOnStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComeOnStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComeOnStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

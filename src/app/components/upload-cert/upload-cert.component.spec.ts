import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCertComponent } from './upload-cert.component';

describe('UploadCertComponent', () => {
  let component: UploadCertComponent;
  let fixture: ComponentFixture<UploadCertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddInputComponent } from './add-input.component';

describe('AddInputComponent', () => {
  let component: AddInputComponent;
  let fixture: ComponentFixture<AddInputComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

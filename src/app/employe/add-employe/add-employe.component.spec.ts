import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEmployeComponent } from './add-employe.component';

describe('AddEmployeComponent', () => {
  let component: AddEmployeComponent;
  let fixture: ComponentFixture<AddEmployeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

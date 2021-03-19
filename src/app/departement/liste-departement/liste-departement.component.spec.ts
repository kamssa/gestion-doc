import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListeDepartementComponent } from './liste-departement.component';

describe('ListeDepartementComponent', () => {
  let component: ListeDepartementComponent;
  let fixture: ComponentFixture<ListeDepartementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

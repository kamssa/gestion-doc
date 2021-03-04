import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDepartementComponent } from './liste-departement.component';

describe('ListeDepartementComponent', () => {
  let component: ListeDepartementComponent;
  let fixture: ComponentFixture<ListeDepartementComponent>;

  beforeEach(async(() => {
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

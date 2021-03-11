import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListeEmployeComponent } from './liste-employe.component';

describe('ListeEmployeComponent', () => {
  let component: ListeEmployeComponent;
  let fixture: ComponentFixture<ListeEmployeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

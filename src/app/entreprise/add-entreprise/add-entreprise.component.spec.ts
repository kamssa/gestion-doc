import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEntrepriseComponent } from './add-entreprise.component';

describe('AddEntrepriseComponent', () => {
  let component: AddEntrepriseComponent;
  let fixture: ComponentFixture<AddEntrepriseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

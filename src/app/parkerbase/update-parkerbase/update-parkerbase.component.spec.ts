import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParkerbaseComponent } from './update-parkerbase.component';

describe('UpdateParkerbaseComponent', () => {
  let component: UpdateParkerbaseComponent;
  let fixture: ComponentFixture<UpdateParkerbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParkerbaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParkerbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

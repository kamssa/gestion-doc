import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParkerbaseComponent } from './list-parkerbase.component';

describe('ListParkerbaseComponent', () => {
  let component: ListParkerbaseComponent;
  let fixture: ComponentFixture<ListParkerbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListParkerbaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListParkerbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

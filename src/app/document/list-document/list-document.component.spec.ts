import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDocumentComponent } from './list-document.component';

describe('ListDocumentComponent', () => {
  let component: ListDocumentComponent;
  let fixture: ComponentFixture<ListDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

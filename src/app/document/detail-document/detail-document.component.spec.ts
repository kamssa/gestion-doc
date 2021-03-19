import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailDocumentComponent } from './detail-document.component';

describe('DetailDocumentComponent', () => {
  let component: DetailDocumentComponent;
  let fixture: ComponentFixture<DetailDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

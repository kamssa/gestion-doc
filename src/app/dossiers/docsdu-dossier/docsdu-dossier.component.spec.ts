import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsduDossierComponent } from './docsdu-dossier.component';

describe('DocsduDossierComponent', () => {
  let component: DocsduDossierComponent;
  let fixture: ComponentFixture<DocsduDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsduDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsduDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsValidationComponent } from './documents-validation.component';

describe('DocumentsValidationComponent', () => {
  let component: DocumentsValidationComponent;
  let fixture: ComponentFixture<DocumentsValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

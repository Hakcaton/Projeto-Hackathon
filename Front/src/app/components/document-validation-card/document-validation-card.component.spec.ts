import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentValidationCardComponent } from './document-validation-card.component';

describe('DocumentValidationCardComponent', () => {
  let component: DocumentValidationCardComponent;
  let fixture: ComponentFixture<DocumentValidationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentValidationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentValidationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

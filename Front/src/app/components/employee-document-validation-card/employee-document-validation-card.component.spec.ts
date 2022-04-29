import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDocumentValidationCardComponent } from './employee-document-validation-card.component';

describe('EmployeeDocumentValidationCardComponent', () => {
  let component: EmployeeDocumentValidationCardComponent;
  let fixture: ComponentFixture<EmployeeDocumentValidationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDocumentValidationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDocumentValidationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

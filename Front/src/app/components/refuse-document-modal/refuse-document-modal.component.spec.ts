import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuseDocumentModalComponent } from './refuse-document-modal.component';

describe('RefuseDocumentModalComponent', () => {
  let component: RefuseDocumentModalComponent;
  let fixture: ComponentFixture<RefuseDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefuseDocumentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuseDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

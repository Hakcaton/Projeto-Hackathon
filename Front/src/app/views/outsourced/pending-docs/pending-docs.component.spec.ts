import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDocsComponent } from './pending-docs.component';

describe('PendingDocsComponent', () => {
  let component: PendingDocsComponent;
  let fixture: ComponentFixture<PendingDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

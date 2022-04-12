import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDocsModuleComponent } from './pending-docs-module.component';

describe('PendingDocsModuleComponent', () => {
  let component: PendingDocsModuleComponent;
  let fixture: ComponentFixture<PendingDocsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingDocsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDocsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

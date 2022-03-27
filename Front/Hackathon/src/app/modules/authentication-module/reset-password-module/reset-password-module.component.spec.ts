import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordModuleComponent } from './reset-password-module.component';

describe('SetpasswordModuleComponent', () => {
  let component: ResetpasswordModuleComponent;
  let fixture: ComponentFixture<ResetpasswordModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpasswordModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

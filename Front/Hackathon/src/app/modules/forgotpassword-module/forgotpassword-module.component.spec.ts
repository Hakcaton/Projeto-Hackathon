import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordModuleComponent } from './forgotpassword-module.component';

describe('ForgotpasswordModuleComponent', () => {
  let component: ForgotpasswordModuleComponent;
  let fixture: ComponentFixture<ForgotpasswordModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationModuleComponent } from './authentication-module.component';

describe('AuthenticationModuleComponent', () => {
  let component: AuthenticationModuleComponent;
  let fixture: ComponentFixture<AuthenticationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

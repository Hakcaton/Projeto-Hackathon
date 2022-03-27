import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpasswordModuleComponent } from './setpassword-module.component';

describe('SetpasswordModuleComponent', () => {
  let component: SetpasswordModuleComponent;
  let fixture: ComponentFixture<SetpasswordModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetpasswordModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetpasswordModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCompaniesComponent } from './registered-companies.component';

describe('RegisteredCompaniesComponent', () => {
  let component: RegisteredCompaniesComponent;
  let fixture: ComponentFixture<RegisteredCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContractsComponent } from './company-contracts.component';

describe('CompanyContractsComponent', () => {
  let component: CompanyContractsComponent;
  let fixture: ComponentFixture<CompanyContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

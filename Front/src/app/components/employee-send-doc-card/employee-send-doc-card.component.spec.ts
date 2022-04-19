import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSendDocCardComponent } from './employee-send-doc-card.component';

describe('EmployeeSendDocCardComponent', () => {
  let component: EmployeeSendDocCardComponent;
  let fixture: ComponentFixture<EmployeeSendDocCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSendDocCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSendDocCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

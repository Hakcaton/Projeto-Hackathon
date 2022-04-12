import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDocCardComponent } from './send-doc-card.component';

describe('SendDocCardComponent', () => {
  let component: SendDocCardComponent;
  let fixture: ComponentFixture<SendDocCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendDocCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDocCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

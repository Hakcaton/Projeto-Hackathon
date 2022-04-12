import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTagComponent } from './doc-tag.component';

describe('DocTagComponent', () => {
  let component: DocTagComponent;
  let fixture: ComponentFixture<DocTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

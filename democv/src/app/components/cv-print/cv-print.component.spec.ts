import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPrintComponent } from './cv-print.component';

describe('CvPrintComponent', () => {
  let component: CvPrintComponent;
  let fixture: ComponentFixture<CvPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

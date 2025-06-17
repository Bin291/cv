import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFormSmallComponent } from './content-form-small.component';

describe('ContentFormSmallComponent', () => {
  let component: ContentFormSmallComponent;
  let fixture: ComponentFixture<ContentFormSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentFormSmallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentFormSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

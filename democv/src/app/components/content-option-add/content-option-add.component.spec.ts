import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOptionAddComponent } from './content-option-add.component';

describe('ContentOptionAddComponent', () => {
  let component: ContentOptionAddComponent;
  let fixture: ComponentFixture<ContentOptionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentOptionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentOptionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

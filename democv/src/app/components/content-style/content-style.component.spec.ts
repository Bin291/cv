import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentStyleComponent } from './content-style.component';

describe('ContentStyleComponent', () => {
  let component: ContentStyleComponent;
  let fixture: ComponentFixture<ContentStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

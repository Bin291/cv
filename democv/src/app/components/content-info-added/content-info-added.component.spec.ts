import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentInfoAddedComponent } from './content-info-added.component';

describe('ContentInfoAddedComponent', () => {
  let component: ContentInfoAddedComponent;
  let fixture: ComponentFixture<ContentInfoAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentInfoAddedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentInfoAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

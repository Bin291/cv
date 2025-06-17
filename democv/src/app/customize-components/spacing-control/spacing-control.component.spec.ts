import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacingControlComponent } from './spacing-control.component';

describe('SpacingControlComponent', () => {
  let component: SpacingControlComponent;
  let fixture: ComponentFixture<SpacingControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacingControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

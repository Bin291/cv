import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputcontentComponent } from './inputcontent.component';

describe('InputcontentComponent', () => {
  let component: InputcontentComponent;
  let fixture: ComponentFixture<InputcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputcontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

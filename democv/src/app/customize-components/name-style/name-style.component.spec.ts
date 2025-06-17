import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameStyleComponent } from './name-style.component';

describe('NameStyleComponent', () => {
  let component: NameStyleComponent;
  let fixture: ComponentFixture<NameStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

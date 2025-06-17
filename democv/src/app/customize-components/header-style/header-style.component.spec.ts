import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStyleComponent } from './header-style.component';

describe('HeaderStyleComponent', () => {
  let component: HeaderStyleComponent;
  let fixture: ComponentFixture<HeaderStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

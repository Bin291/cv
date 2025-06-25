import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavHomeComponent } from './side-nav-home.component';

describe('SideNavHomeComponent', () => {
  let component: SideNavHomeComponent;
  let fixture: ComponentFixture<SideNavHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

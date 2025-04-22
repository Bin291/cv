import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemuseComponent } from './remuse.component';

describe('RemuseComponent', () => {
  let component: RemuseComponent;
  let fixture: ComponentFixture<RemuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemuseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

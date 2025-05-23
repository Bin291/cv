import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadBoxComponent } from './download-box.component';

describe('DownloadBoxComponent', () => {
  let component: DownloadBoxComponent;
  let fixture: ComponentFixture<DownloadBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

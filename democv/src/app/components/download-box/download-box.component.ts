import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { ResumeService } from '../../services/resume/resume.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ShareModule} from '../../../shared/shared.module';
import {isPlatformBrowser} from '@angular/common';
import {ResumeModel} from '../../models/resume.model';
import { Router } from '@angular/router';
declare const html2pdf: any;
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';

import {CvPrintComponent} from '../cv-print/cv-print.component';
@Component({
  selector: 'app-download-box',
  templateUrl: './download-box.component.html',
  imports: [
    MatIconButton,
    MatIcon,
    ShareModule,
    MatButton,
    CvPrintComponent
  ],
  styleUrls: ['./download-box.component.scss']
})
export class DownloadBoxComponent implements OnInit , AfterViewInit {
  showCvPrint = false;

  @ViewChild('cvPrintRef') cvPrintRef!: ElementRef;
  resumeName = '';        // biến hiển thị / edit
  private originalName = '';  // lưu tạm để restore khi Cancel
  editing = false;

  @ViewChild('titleInput', { static: false }) titleInput!: ElementRef<HTMLInputElement>;

  private resumeId: string | null = null;
  private isBrowser: boolean;

  constructor(
    private resumeService: ResumeService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router:Router,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Lấy resume_id chỉ trên browser
    if (this.isBrowser) {
      this.resumeId = localStorage.getItem('resume_id');
    }
    if (this.resumeId) {
      // Load lần đầu
      this.resumeService.getResume(this.resumeId)
        .subscribe((res: ResumeModel) => {
          this.resumeName = res.resume_name || '';
          this.originalName = this.resumeName;
        });
    }
  }

  startEdit(): void {
    // Khi vào edit, lưu bản gốc để Cancel
    this.originalName = this.resumeName;
    this.editing = true;
    // focus input
    setTimeout(() => this.titleInput.nativeElement.focus(), 0);
  }

  save(): void {
    const trimmed = this.resumeName.trim();
    if (!trimmed || !this.resumeId) {
      return this.cancel();
    }




    // 1. Lưu tạm bản gốc để nếu lỗi còn restore được
    this.originalName = this.resumeName;

    // 2. Optimistic update: gán giá trị mới và đóng edit-mode ngay
    this.resumeName = trimmed;
    this.editing = false;

    // 3. Gọi service để cập nhật backend
    this.resumeService.update(this.resumeId, { resume_name: trimmed })
      .subscribe({
        next: updated => {
          // không cần làm gì thêm, vì UI đã đúng
        },
        error: () => {
          // nếu lỗi thì restore tên cũ và thông báo (tuỳ bạn)
          this.resumeName = this.originalName;
          // optionally show error toast
        }
      });
  }

  async downloadPDF(): Promise<void> {
    if (typeof window === 'undefined') return;

    const html2pdf = await import('html2pdf.js');
    const element = document.querySelector('.cv') as HTMLElement;
    if (!element) return;

    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf.default().from(element).set(opt).save();
  }


  ngAfterViewInit() {
    // Kiểm tra DOM có tồn tại
    console.log('cv-print có tồn tại:', this.cvPrintRef?.nativeElement);
  }

  cancel(): void {
    // restore về giá trị gốc
    this.resumeName = this.originalName;
    this.editing = false;
  }

}

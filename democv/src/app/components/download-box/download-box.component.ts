import {Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import { ResumeService } from '../../services/resume/resume.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ShareModule} from '../../../shared/shared.module';
import {isPlatformBrowser} from '@angular/common';
import {ResumeModel} from '../../models/resume.model';

@Component({
  selector: 'app-download-box',
  templateUrl: './download-box.component.html',
  imports: [
    MatIconButton,
    MatIcon,
    ShareModule,
    MatButton
  ],
  styleUrls: ['./download-box.component.scss']
})
export class DownloadBoxComponent implements OnInit {
  resumeName = '';        // biến hiển thị / edit
  private originalName = '';  // lưu tạm để restore khi Cancel
  editing = false;

  @ViewChild('titleInput', { static: false }) titleInput!: ElementRef<HTMLInputElement>;

  private resumeId: string | null = null;
  private isBrowser: boolean;

  constructor(
    private resumeService: ResumeService,
    @Inject(PLATFORM_ID) private platformId: Object
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



  cancel(): void {
    // restore về giá trị gốc
    this.resumeName = this.originalName;
    this.editing = false;
  }
}

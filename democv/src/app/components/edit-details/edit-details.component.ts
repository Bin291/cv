import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResumeState } from '../../ngrx/resume/resume.state';
import { ResumeModel } from '../../models/resume.model';
import { updateResume } from '../../ngrx/resume/resume.action';
import { ResumeService } from '../../services/resume/resume.service';
import { MatDialog } from '@angular/material/dialog';
import { CooperComponent } from '../cooper/cooper.component';
import { ImageShareService } from '../../services/image-share/image-share.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButton],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss'
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  @Input() resume$!: Observable<ResumeModel | null>;
  @Output() back = new EventEmitter<void>();

  form: FormGroup;
  private subscriptions: Subscription[] = [];
  protected isTyping = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private imageShareService: ImageShareService,
    private resumeService: ResumeService,
    private store: Store<{ resume: ResumeState }>
  ) {
    this.form = this.fb.group({
      full_name: [''],
      job_title: [''],
      email: [''],
      phone: [''],
      location: [''],
      avatar_url: [''],
    });
  }

  ngOnInit(): void {
    if (this.resume$) {
      const sub = this.resume$.subscribe((resume) => {
        if (resume && !this.isTyping) {
          this.form.patchValue(resume);
        }
      });
      this.subscriptions.push(sub);
    }

    const sub2 = this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.isTyping = false;
      let resumeId = localStorage.getItem('resume_id');
      if (!resumeId) {
        this.resumeService.createResume().subscribe((res: ResumeModel) => {
          resumeId = res.id!;
          localStorage.setItem('resume_id', resumeId);
          this.dispatchUpdate(resumeId, value);
        });
      } else {
        this.dispatchUpdate(resumeId, value);
      }
    });

    this.subscriptions.push(sub2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  dispatchUpdate(id: string, data: Partial<ResumeModel>) {
    this.resumeService.updateResume(id, data).subscribe({
      next: () => {
        this.store.dispatch(updateResume({ id, data }));
      },
      error: (err) => {
        console.warn('⚠️ Update failed, fallback:', err);
        if (err.status === 500 || err.message?.includes('0 rows')) {
          localStorage.removeItem('resume_id');
          this.resumeService.createResume().subscribe((res: ResumeModel) => {
            const newId = res.id!;
            localStorage.setItem('resume_id', newId);
            this.store.dispatch(updateResume({ id: newId, data }));
          });
        }
      }
    });
  }

  onSave() {
    this.back.emit();
  }

  onCancel() {
    this.back.emit();
  }

  openCooperDialog(): void {
    const dialogRef = this.dialog.open(CooperComponent, {
      width: '840px',
      minWidth: '650px',
    });

    dialogRef.componentInstance.imageUploaded.subscribe((img: string) => {
      this.form.patchValue({ avatar_url: img });
      this.imageShareService.updateCroppedImage(img);
    });
  }
}

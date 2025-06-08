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
import {AuthModel} from '../../models/auth.model';
import {AuthState} from '../../ngrx/auth/auth.state';
import {AuthService} from '../../services/auth/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

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
  atht$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  personalInfo = [
    { id: 1, label: 'Date of Birth' },
    { id: 2, label: 'Nationality' },
    { id: 3, label: 'Passport or Id' },
    { id: 4, label: 'Marital status' },
    { id: 5, label: 'Military Service' },
    { id: 6, label: 'Driving License' },
    { id: 7, label: 'Gender/Pronoun' },
    { id: 8, label: 'Visa Status' }
  ];
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private imageShareService: ImageShareService,
    private resumeService: ResumeService,
    private authService: AuthService,
    private store: Store<{
      resume: ResumeState,
      auth: AuthState }>,
  ) {
    this.form = this.fb.group({
      full_name: [''],
      job_title: [''],
      email: [''],
      phone: [''],
      location: [''],
      avatar_url: [''],
      uid: ['%{uid}'],
    });
    this.atht$ = this.store.select('auth', 'authData');
    this.resume$ = this.store.select(state => state.resume.resume);
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

    this.subscriptions.push(

    );
    this.subscriptions.push(
      this.atht$.subscribe((auth: AuthModel | null) => {
        if (auth?.uid) {
          this.authData = auth;
          this.form.patchValue({ uid: auth.uid });
          console.log(auth)
        }
      })
    );
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
            let resumeId: string | null = null;
            if (typeof window !== 'undefined' && window.localStorage) {
              resumeId = window.localStorage.getItem('resume_id');
            }

            if (!resumeId) {
              console.error('No resume_id in localStorage');
              return;
            }

            this.authService.getCurrentUser().pipe(
              take(1),
              switchMap((user: User | null) => {
                if (!user || !user.uid) {
                  throw new Error('Chưa login hoặc không có uid');
                }
                const uid = user.uid;
                this.store.dispatch(updateResume({ id: resumeId!, data: this.form.value }));

                return this.resumeService.updateResume(resumeId!, {
                  ...this.form.value,
                  uid,
                });
              })
            )
            .subscribe({
              next: updated => {
                console.log('Details & UID saved:', updated);
                this.back.emit();
              },
              error: err => {
                console.error('Error saving details:', err);
              }
            });
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

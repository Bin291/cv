import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthModel} from '../../models/auth.model';
import {AuthState} from '../../ngrx/auth/auth.state';
import {AuthService} from '../../services/auth/auth.service';
import { take, switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {ShareModule} from '../../../shared/shared.module';
import {MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import { MatButtonModule    } from '@angular/material/button';
import { MatIconModule      } from '@angular/material/icon';
import {LinkDialogComponent} from '../link-dialog/link-dialog.component';
interface Info { id: number; label: string; }


interface Link {
  id: number;
  label: string;
  name: string;
  value: string;
  type: 'link' | 'info'; // Add type property
}


@Component({
  selector: 'app-edit-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButton, MatIcon, MatFormField, MatIconButton, MatInput, FormsModule, MatLabel, ShareModule],
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  @Input() resume$!: Observable<ResumeModel | null>;
  @Output() back = new EventEmitter<void>();

  form: FormGroup;
  private subscriptions: Subscription[] = [];
  protected isTyping = false;
  atht$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  personalInfo: Info[] = [
    { id: 1, label: 'Date of Birth' },
    { id: 2, label: 'Nationality' },
    { id: 3, label: 'Passport or Id' },
    { id: 4, label: 'Marital status' },
    { id: 5, label: 'Military Service' },
    { id: 6, label: 'Driving License' },
    { id: 7, label: 'Gender/Pronoun' },
    { id: 8, label: 'Visa Status' },
  ];
  saved: Record<number, string> = {};
  selectedIds: number[] = [];


  links: Link[] = [
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
    { id: 1, label: 'Website', name: '', value: '', type: 'link' },
    { id: 2, label: 'GitHub', name: '', value: '', type: 'link' },
    { id: 3, label: 'Medium', name: '', value: '', type: 'link' },
    { id: 4, label: 'Skype', name: '', value: '', type: 'link' },
    { id: 5, label: 'LinkedIn', name: '', value: '', type: 'link' },
    { id: 6, label: 'ORCID', name: '', value: '', type: 'link' },
    { id: 7, label: 'Bluesky', name: '', value: '', type: 'link' },
    { id: 8, label: 'Threads', name: '', value: '', type: 'link' },
    { id: 9, label: 'Discord', name: '', value: '', type: 'link' },
    { id: 10, label: 'Dribbble', name: '', value: '', type: 'link' },
    { id: 11, label: 'AngelList', name: '', value: '', type: 'link' },
    { id: 12, label: 'HackerRank', name: '', value: '', type: 'link' },
    { id: 13, label: 'StackOverflow', name: '', value: '', type: 'link' },
    { id: 14, label: 'KakaoTalk', name: '', value: '', type: 'link' },
    { id: 15, label: 'Coding Ninjas', name: '', value: '', type: 'link' },
    { id: 16, label: 'Hugging Face', name: '', value: '', type: 'link' },
    { id: 17, label: 'Info 1', name: '', value: '', type: 'info' },
    { id: 18, label: 'Info 2', name: '', value: '', type: 'info' },
    { id: 19, label: 'Info 3', name: '', value: '', type: 'info' },
  ];

  selectedLinkIds: number[] = [];
  customSuggestion: string = '';
  isViewAllExpanded: boolean = false;
  searchQuery: string = '';


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private imageShareService: ImageShareService,
    private resumeService: ResumeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
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
      resume_name: [''],
      national: [''],
      date_of_birth: [''],
      passport_or_id: [''],
      material_status: [''],
      military_service: [''],
      driving_license: [''],
      visa_status: [''],
      gender_or_pronoun: [''],
      avatar_origin: [''],
      template_id: [''],

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

    this.isTyping = false;
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

  get availableInfo(): Info[] {
    return this.personalInfo.filter(info => !this.selectedIds.includes(info.id));
  }

  startEdit(info: Info) {
    if (!this.selectedIds.includes(info.id)) {
      this.selectedIds.push(info.id);
      this.saved[info.id] = this.saved[info.id] ?? '';
    }
  }

  remove(id: number) {
    const index = this.selectedIds.indexOf(id);
    if (index !== -1) {
      this.selectedIds.splice(index, 1);
      const { [id]: _, ...rest } = this.saved;
      this.saved = rest;
    }
  }

  getLabelPersonal(id: number): string {
    const info = this.personalInfo.find(i => i.id === id);
    return info ? info.label : '';
  }

// ==================Link==========================

  getInitialLinks(): Link[] {
    return this.links.slice(0, 4); // Show only the first 4 links initially
  }

  getAllLinks(): Link[] {
    return this.links.filter(link => !this.selectedLinkIds.includes(link.id)); // All available links
  }

  getAvailableLinks(): Link[] {
    return this.links.filter(link => !this.selectedLinkIds.includes(link.id));
  }

  startEditLink(link: Link) {
    if (!this.selectedLinkIds.includes(link.id)) {
      this.selectedLinkIds.push(link.id);
    }
  }

  removeLink(id: number) {
    const index = this.selectedLinkIds.indexOf(id);
    if (index !== -1) {
      this.selectedLinkIds.splice(index, 1);
      const link = this.getLinkById(id);
      if (link) {
        link.name = '';
        link.value = '';
      }
    }
  }

  openLinkDialogLink(id: number) {
    const link = this.getLinkById(id);
    if (link) {
      const dialogRef = this.dialog.open(LinkDialogComponent, {
        width: '300px',
        data: { label: link.label, name: link.name, value: link.value }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          link.value = result;
        }
      });
    }
  }

  toggleViewAllLink() {
    this.isViewAllExpanded = !this.isViewAllExpanded;
  }

  getFilteredAllLinks(): Link[] {
    return this.getAllLinks().filter(link =>
      link.label.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getLabel(id: number): string {
    const link = this.getLinkById(id);
    return link ? link.label : '';
  }

  getName(id: number): string {
    const link = this.getLinkById(id);
    return link ? link.name : '';
  }

  getValue(id: number): string {
    const link = this.getLinkById(id);
    return link ? link.value || 'Link URL' : 'Link URL';
  }

  isLinkActive(id: number): boolean {
    const link = this.getLinkById(id);
    return link ? !!link.value : false;
  }

  getLinkById(id: number): Link | undefined {
    return this.links.find(link => link.id === id);
  }
}

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
import {loadResume, updateResume} from '../../ngrx/resume/resume.action';
import { ResumeService } from '../../services/resume/resume.service';
import { MatDialog } from '@angular/material/dialog';
import { CooperComponent } from '../cooper/cooper.component';
import { ImageShareService } from '../../services/image-share/image-share.service';
import {catchError, filter, Observable, Subscription, throwError} from 'rxjs';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
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

import {LinkDialogComponent} from '../link-dialog/link-dialog.component';
import {LinkModel} from '../../models/link.model';
interface Info {
  id: string;
  label: string;
}


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
  private subs = new Subscription();
  form: FormGroup;
  subscriptions: Subscription[] = [];
  private sub = new Subscription();
  resumeId!: string;
  protected isTyping = false;
  atht$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  personalInfo = [
    { id: 'date_of_birth', label: 'Date of Birth' },
    { id: 'nationality', label: 'Nationality' },
    { id: 'passport_or_id', label: 'Passport or Id' },
    { id: 'material_status', label: 'Material Status' },     // sửa đúng
    { id: 'minitary_service', label: 'Military Service' }, // theo DB typo
    { id: 'driving_license', label: 'Driving License' },
    { id: 'gender_or_pronoun', label: 'Gender/Pronoun' },
    { id: 'visa_status', label: 'Visa Status' },
  ];


  // 2) selectedIds giờ là string[]
  selectedIds: string[] = [];
  saved: Record<number, string> = {};

  links: LinkModel[] = [
    { id: 1,  label: 'Website',        name: '', value: '', icon: 'fa-solid fa-table-columns' },
    { id: 2,  label: 'GitHub',         name: '', value: '', icon: 'fa-brands fa-github' },
    { id: 3,  label: 'Medium',         name: '', value: '', icon: 'fa-brands fa-medium' },
    { id: 4,  label: 'Skype',          name: '', value: '', icon: 'fa-brands fa-skype' },
    { id: 5,  label: 'LinkedIn',       name: '', value: '', icon: 'fa-brands fa-linkedin' },
    { id: 6,  label: 'ORCID',          name: '', value: '', icon: 'fa-brands fa-orcid' },
    { id: 7,  label: 'Bluesky',        name: '', value: '', icon: 'fa-brands fa-bluesky' },
    { id: 8,  label: 'Threads',        name: '', value: '', icon: 'fa-brands fa-threads' },
    { id: 9,  label: 'Discord',        name: '', value: '', icon: 'fa-brands fa-discord' },
    { id: 10, label: 'Dribbble',       name: '', value: '', icon: 'fa-brands fa-dribbble' },
    { id: 11, label: 'AngelList',      name: '', value: '', icon: 'fa-brands fa-angellist' },
    { id: 12, label: 'HackerRank',     name: '', value: '', icon: 'fa-brands fa-hackerrank' },
    { id: 13, label: 'StackOverflow',  name: '', value: '', icon: 'fa-brands fa-stack-overflow' },
    { id: 14, label: 'KakaoTalk',      name: '', value: '', icon: 'fa-solid fa-k' },
    { id: 15, label: 'Coding Ninjas',  name: '', value: '', icon: 'fa-solid fa-user-ninja' },
    { id: 16, label: 'Hugging Face',   name: '', value: '', icon: 'fa-solid fa-face-smiling-hands' },
    { id: 17, label: 'Qwiklabs',       name: '', value: '', icon: 'fa-solid fa-q' },
    { id: 18, label: 'IMDb',           name: '', value: '', icon: 'fa-brands fa-imdb' },
    { id: 19, label: 'Google Play',    name: '', value: '', icon: 'fa-brands fa-google-play' },
    { id: 20, label: 'Tumblr',         name: '', value: '', icon: 'fa-brands fa-tumblr' },
    { id: 21, label: 'Tripadvisor',    name: '', value: '', icon: 'fa-solid fa-t' },
    { id: 22, label: 'Yelp',           name: '', value: '', icon: 'fa-brands fa-yelp' },
    { id: 23, label: 'Slack',          name: '', value: '', icon: 'fa-brands fa-slack' },
    { id: 24, label: 'Flickr',         name: '', value: '', icon: 'fa-brands fa-flickr' },
    { id: 25, label: 'ReverbNation',   name: '', value: '', icon: 'fa-solid fa-r' },
    { id: 26, label: 'DeviantArt',     name: '', value: '', icon: 'fa-brands fa-deviantart' },
    { id: 27, label: 'Vimeo',          name: '', value: '', icon: 'fa-brands fa-vimeo' },
    { id: 28, label: 'Reddit',         name: '', value: '', icon: 'fa-brands fa-reddit' },
    { id: 29, label: 'Pinterest',      name: '', value: '', icon: 'fa-brands fa-pinterest' },
    { id: 30, label: 'Blogger',        name: '', value: '', icon: 'fa-brands fa-blogger' },
    { id: 31, label: 'Spotify',        name: '', value: '', icon: 'fa-brands fa-spotify' },
    { id: 32, label: 'Bitcoin',        name: '', value: '', icon: 'fa-brands fa-bitcoin' },
    { id: 33, label: 'App Store',      name: '', value: '', icon: 'fa-brands fa-app-store-ios' },
  ];
  fieldMap: Record<number, string> = {};
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
      // Personal Info
      date_of_birth: [''],
      nationality: [''],
      passport_or_id: [''],
      material_status: [''],
      minitary_service: [''],
      driving_license: [''],
      gender_or_pronoun: [''],
      visa_status: [''],
      links: this.fb.array([]), // Sử dụng FormArray nếu cần
    });
    this.atht$ = this.store.select('auth', 'authData');
    this.atht$ = this.store.select(state => state.auth.authData);
    this.resume$ = this.store.select(state => state.resume.resume);
  }

  ngOnInit() {
    // 1) Lấy resumeId từ localStorage (chỉ trên browser)
    let resumeId: string | null = null;
    if (typeof window !== 'undefined') {
      resumeId = window.localStorage.getItem('resume_id');
    }
    if (!resumeId) {
      console.error('No resume_id in localStorage – please select a resume on Home page');
      return;
    }

    // 2) Dispatch loadResume để fetch dữ liệu
    this.store.dispatch(loadResume({ id: resumeId }));

    // 3) Patch form + init selectedIds
    this.initFormPatch(resumeId);

    // 4) Auto-merge UID khi login giữa chừng
    this.subscriptions.push(
      this.atht$
        .pipe(
          filter(auth => !!auth?.uid),
          distinctUntilChanged((a, b) => a!.uid === b!.uid),
          take(1)
        )
        .subscribe(auth => {
          const uid = auth!.uid!;
          this.form.patchValue({ uid });
          this.dispatchUpdate(resumeId!, { uid });
        })
    );

    // 5) Auto-save khi form thay đổi
    this.subscriptions.push(
      this.form.valueChanges
        .pipe(debounceTime(500))
        .subscribe(value => {
          this.isTyping = false;
          this.dispatchUpdate(resumeId!, value);
        })
    );
  }

// Tách logic patch form + selectedIds
  private initFormPatch(resumeId: string) {
    this.subscriptions.push(
      this.resume$
        .pipe(filter(r => !!r), take(1))
        .subscribe(resume => {
          this.form.patchValue(resume!);
          this.selectedIds = this.personalInfo
            .map(i => i.id)
            .filter(key => !!(resume as any)[key]);
        })
    );
  }

  dispatchUpdate(id: string, data: Partial<ResumeModel>) {
    // Chỉ update, không tạo mới resume
    this.resumeService.updateResume(id, data).subscribe({
      next: () => {
        // Dispatch NgRx để cập nhật store
        this.store.dispatch(updateResume({ id, data }));
      },
      error: err => {
        console.error('Update resume failed', err);
        // Có thể hiển thị toast hoặc xử lý lỗi ở đây
      }
    });
  }



  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSave() {
    // 1) Lấy resumeId an toàn
    let resumeId: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      resumeId = window.localStorage.getItem('resume_id');
    }
    if (!resumeId) {
      console.error('No resume_id in localStorage');
      return;
    }

    // 2) Lấy user
    this.authService.getCurrentUser().pipe(
      take(1),
      switchMap(user => {
        // 3) Nếu không login thì trả về error hoặc bạn có thể set uid='guest' tuỳ case
        if (!user?.uid) {
          return throwError(() => new Error('Chưa login hoặc không có uid'));
        }
        const uid = user.uid;

        // 4) Chuẩn bị payload
        const payload = {
          ...this.form.value,
          uid,
        };

        // 5) Dispatch NgRx action trước (để UI phản hồi nhanh)
        this.store.dispatch(updateResume({ id: resumeId!, data: payload }));

        // 6) Gọi service update thực sự lên backend
        return this.resumeService.updateResume(resumeId!, payload)
          .pipe(
            catchError(err => {
              console.error('API updateResume failed', err);
              // Bạn có thể dispatch rollback action nếu muốn
              return throwError(() => err);
            })
          );
      })
    )
      .subscribe({
        next: updated => {
          console.log('Details & UID saved:', updated);
          // 7) Emit sự kiện đóng form / quay lại
          this.back.emit();
        },
        error: err => {
          console.error('Error saving details:', err);
          // Hiển thị toast hoặc message lỗi nếu cần
        }
      });
    this.back.emit();
    // Reset flag typing
    this.isTyping = false;
  }

  onCancel() {
    // Chỉ emit về parent để đóng form
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





  // ==================Personal Info==========================

  get availableInfo(): Info[] {
    return this.personalInfo.filter(info => !this.selectedIds.includes(info.id));
  }

  startEdit(info: Info): void {
    if (!this.selectedIds.includes(info.id)) {
      this.selectedIds.push(info.id);
    }
  }

  remove(id: string): void {
    this.selectedIds = this.selectedIds.filter(i => i !== id);
    this.form.patchValue({ [id]: '' });
    this.resumeService.updateResume(this.resumeId, { [id]: null }).subscribe();
  }

  getLabelPersonal(id: string): string {
    return this.personalInfo.find(i => i.id === id)?.label || '';
  }

// ==================Link==========================

getInitialLinks(): Link[] {
    return this.links.slice(0, 4).map(link => ({
      ...link,
      type: 'link',
      name: link.name ?? '',
      value: link.value ?? ''
    }));
  }

  getAllLinks(): Link[] {
    return this.links
      .filter(link => !this.selectedLinkIds.includes(link.id))
      .map(link => ({
        ...link,
        type: 'link',
        name: link.name ?? '',
        value: link.value ?? ''
      }));
  }

  getAvailableLinks(): Link[] {
    return this.links
      .filter(link => !this.selectedLinkIds.includes(link.id))
      .map(link => ({
        ...link,
        type: 'link',
        name: link.name ?? '',
        value: link.value ?? ''
      }));
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
  // isPersonalSelected(id: number): boolean {
  //   return this.selectedOptions.some(opt => opt.id === id);
  // }

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

  // getName(id: number): string {
  //   const link = this.getLinkById(id);
  //   return link ? link.name : '';
  // }

  getValue(id: number): string {
    const link = this.getLinkById(id);
    return link ? link.value || 'Link URL' : 'Link URL';
  }

  isLinkActive(id: number): boolean {
    const link = this.getLinkById(id);
    return link ? !!link.value : false;
  }

  getLinkById(id: number): LinkModel | undefined {
    return this.links.find(link => link.id === id);
  }
}

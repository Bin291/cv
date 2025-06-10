import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription, Observable, of } from 'rxjs';
import {take, switchMap, filter, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  createResume,
  createResumeFailure,
  loadAllResumes,
  loadResume,
  updateResume
} from '../../ngrx/resume/resume.action';
import { ResumeModel } from '../../models/resume.model';
import { ResumeService } from '../../services/resume/resume.service';
import { AuthService } from '../../services/auth/auth.service';
import { AuthModel } from '../../models/auth.model';
import { ResumeState } from '../../ngrx/resume/resume.state';
import { AuthState }   from '../../ngrx/auth/auth.state';
import {MatIcon} from '@angular/material/icon';
import {LetDirective} from '@ngrx/component';
import {DatePipe, NgForOf} from '@angular/common';
import {Actions, ofType} from '@ngrx/effects';
import {User} from '@angular/fire/auth';
import {LoginComponent} from '../../components/login/login.component';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    MatIcon,
    LetDirective,
    DatePipe,
    NgForOf,

  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private store         = inject(Store<{ resume: ResumeState; auth: AuthState }>);
  private resumeService = inject(ResumeService);
  private authService   = inject(AuthService);
  private router        = inject(Router);
  private subs          = new Subscription();

  subcription: Subscription[] = [];

  // Select thẳng state
  resumes$!: Observable<ResumeModel[]>;
  auth$   !: Observable<AuthModel | null>;
  private actions$= inject(Actions);
  user$!: Observable<User | null>;
  defaultThumbnail = '../../assets/logos/Frame 5.png';

  constructor(private auth: AuthService) {
    this.resumes$ = this.store.select(s => s.resume.resumes);
    this.auth$    = this.store.select(s => s.auth.authData);
  }

  ngOnInit() {
    // Load danh sách resume khi vào trang
    this.user$ = this.auth.getCurrentUser();
    this.store.dispatch(loadAllResumes());

    // Debug auth
    this.subs.add(
      this.auth$
        .pipe(filter(a => !!a))
        .subscribe(a => console.log('[Auth]', a))
    );

    // Bắt lỗi khi createResume thất bại
    this.subs.add(
      this.actions$.pipe(
        ofType(createResumeFailure),
        tap(({ error }) => {
          console.error('Tạo resume lỗi:', error);
          alert('Không tạo được CV, vui lòng thử lại.');
        })
      )
        .subscribe()
    );


  }

  onCreateResume(): void {
    // Dispatch action tạo resume; effect sẽ lo dịch vụ, token, và điều hướng
    this.store.dispatch(createResume({ payload: {} }));
  }


  onEditResume(id: string): void {
    localStorage.setItem('resume_id', id);
    this.router.navigate(['/content']);
  }



  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

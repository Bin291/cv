import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription, Observable, of } from 'rxjs';
import {take, switchMap, filter, tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  createResume,
  createResumeFailure, deleteResume,
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
import {MatSnackBar} from '@angular/material/snack-bar';



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
isLoading = false;
  subcription: Subscription[] = [];

  // Select thẳng state
  resumes$!: Observable<ResumeModel[]>;
  auth$   !: Observable<AuthModel | null>;
  private actions$= inject(Actions);
  user$!: Observable<User | null>;
  defaultThumbnail = '../../assets/logos/Frame 5.png';

  constructor(private auth: AuthService, resumeService: ResumeService, private snakbar: MatSnackBar) {
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
          this.snakbar.open('Tao resume thất bại: ' + error, 'Hide', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
            horizontalPosition: 'right',
          })
        })
      )
        .subscribe(),

    );


  }

deleteResume(id: string): void {
      this.store.dispatch(deleteResume({ id }));

      this.router.navigate(['']);
      this.snakbar.open('Đã xóa CV thành công', 'Hide', {
        duration: 3000,
        panelClass: ['snackbar-success'],
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });

    }



  onCreateResume(): void {
    // Dispatch action tạo resume; effect sẽ lo dịch vụ, tHideen, và điều hướng
    this.store.dispatch(createResume({ payload: {} }));
    this.snakbar.open('Đang tạo CV mới...', 'Hide', {
      duration: 3000,
      panelClass: ['snackbar-info'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
    this.router.navigate(['/content']);
    this.snakbar.open('Tạo CV mới thành công', 'Hide', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
      horizontalPosition: 'right',
    })

  }


  onEditResume(id: string): void {
    localStorage.setItem('resume_id', id);
    this.router.navigate(['/content']);

  }



  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

import {Component, OnInit, OnDestroy, inject, ChangeDetectorRef} from '@angular/core';
import { Store } from '@ngrx/store';

import {Subscription, Observable, of, map, from} from 'rxjs';
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
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {Actions, ofType} from '@ngrx/effects';
import {User} from '@angular/fire/auth';
import {LoginComponent} from '../../components/login/login.component';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {storeAuth} from '../../ngrx/auth/auth.actions';



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    MatIcon,
    LetDirective,
    DatePipe,
    NgForOf,

    AsyncPipe,
    MatProgressSpinner,
    LoginComponent,


  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private store         = inject(Store<{ resume: ResumeState; auth: AuthState }>);
  private resumeService = inject(ResumeService);
  private authService   = inject(AuthService);
  private router        = inject(Router);
  private subs          = new Subscription();
  isLoading$ !: Observable<boolean>;
  authData: AuthModel | null = null;

  isLoading = false;
  isLoggedIn$: Observable<boolean> | undefined;
  subcription: Subscription[] = [];
  isLoggedIn: boolean = false;
  // Select thẳng state
  resumes$!: Observable<ResumeModel[]>;
  auth$   !: Observable<AuthModel | null>;
  private actions$= inject(Actions);
  user$!: Observable<User | null>;
  defaultThumbnail = '../../assets/logos/Frame 5.png';

  constructor(private auth: AuthService, resumeService: ResumeService, private snakbar: MatSnackBar, private cdr: ChangeDetectorRef) {
    this.resumes$ = this.store.select(s => s.resume.resumes);

    this.auth$    = this.store.select(s => s.auth.authData);
  }

  ngOnInit() {
    this.user$ = this.auth.getCurrentUser();
    this.store.dispatch(loadAllResumes());

    // ✅ Khôi phục auth từ Firebase sau reload
    // Khôi phục Auth từ Firebase khi load lại trang
    this.auth.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) return of(null);
        return from(user.getIdToken()).pipe(
          map(idToken => ({
            idToken,
            uid: user.uid ?? null,
            email: user.email ?? null,
            displayName: user.displayName ?? null,
            photoURL: user.photoURL ?? null
          }))
        );
      })
    ).subscribe(authData => {
      if (authData) {
        this.store.dispatch(storeAuth({ authData }));
      }
    });


    // Đồng bộ authData để dùng trong template
    this.subs.add(
      this.auth$.subscribe(auth => {
        this.authData = auth;
      })
    );

    // Xử lý lỗi tạo CV
    this.subs.add(
      this.actions$.pipe(
        ofType(createResumeFailure),
        tap(({ error }) => {
          this.snakbar.open('Tao resume thất bại: ' + error, 'Hide', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        })
      ).subscribe()
    );

    this.isLoggedIn$ = this.store.select(state => !!state.auth.authData);
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
  loginWithGoogle(): void {
    this.auth.loginWithGoogle().subscribe({
      next: (authData) => {
        if (authData) {
          this.store.dispatch(storeAuth({ authData }));
          window.localStorage.setItem('authData', JSON.stringify(authData));
          this.isLoggedIn = true; // Cập nhật trạng thái đăng nhập
          //reload window
          window.location.reload();
          this.router.navigate(['/']);
          this.cdr.detectChanges(); // 👈 Bắt buộc để template phản ứng

        }
      },
      error: (err) => {
        console.error('Đăng nhập thất bại:', err);
        this.snakbar.open('Đăng nhập thất bại', 'Đóng', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    });
  }



}

import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIcon} from '@angular/material/icon';
import {filter, Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../models/auth.model';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {NavigationEnd, Router} from '@angular/router';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import {clearState} from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-side-nav-home',
    imports: [
        MatButton,
        MatIcon,
        NgIf
    ],
  templateUrl: './side-nav-home.component.html',
  styleUrl: './side-nav-home.component.scss'
})
export class SideNavHomeComponent {
  authData$!: Observable<AuthModel | null>;
  subscription: Subscription[] = [];
  authData!: AuthModel | null;
  selectedMenu = '';
  currentUsers: any;


  constructor(private auth: Auth, private store: Store<{ auth: AuthState }>, private router: Router) {
    this.authData$ = store.select('auth', 'authData');
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.setActiveLink();
    });
    this.setActiveLink();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUsers = user;
      } else {
        this.currentUsers = null;
      }
    });
  }

  menuItems = [
    { label: 'Template', icon: 'bookmark', route: '' },
    // { label: 'Content', icon: 'create', route: '/content' },
    // { label: 'Customize', icon: 'content_cut', route: '/customize' },
    // { label: 'Trash', icon: 'delete', route: '/trash' }
  ];

  setActiveLink(): void {
    const url = this.router.url;
    if (url === '/' || url === '') {
      this.selectedMenu = this.menuItems[0].route;
    } else if (url.includes('/content')) {
      this.selectedMenu = this.menuItems[1].route;
    } else if (url.includes('/customize')) {
      this.selectedMenu = this.menuItems[2].route;
    } else if (url.includes('/trash')) {
      this.selectedMenu = this.menuItems[3].route;
    } else {
      this.selectedMenu = '';
    }
  }

  ngOnInit() {
    this.setActiveLink();

    this.subscription.push(
      this.authData$.subscribe((authData) => {
        if (authData?.idToken) {
          this.authData = authData;
        }
      })
    );
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.clear(); // nếu bạn có lưu gì vào localStorage
      this.store.dispatch(clearState()); // hoặc logoutSuccess nếu bạn có
      window.location.reload(); // tùy chọn
    });
  }


  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }

  // Hàm để chuyển trang và reload
  navigateAndReload(route: string) {
    this.selectedMenu = route;
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
  }
}

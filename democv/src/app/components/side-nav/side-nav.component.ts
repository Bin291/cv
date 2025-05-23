import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {NavigationEnd, RouterLink} from '@angular/router';
import {Auth, onAuthStateChanged} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Router} from '@angular/router';
import {filter, Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../models/auth.model';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import {AuthService} from '../../services/auth/auth.service';
import {ButtonThemeModeComponent} from '../button-theme-mode/button-theme-mode.component';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatIcon,
    MatButton,
    NgClass,
    RouterLink,
    NgIf,

  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent
  implements OnInit
{
  activeLink: string = '';
  authData$ !:Observable<AuthModel | null>;
  subscription: Subscription[] = [];
  authData!: AuthModel |  null;
  selectedMenu = '';
  currentUsers : any;



  constructor(private auth: Auth, private store: Store<{
    auth: AuthState,

  }>, private router: Router) {
    this.authData$ = store.select('auth','authData');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
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
    { label: 'Content', icon: 'create', route: '/content' },
    { label: 'Customize', icon: 'content_cut', route: '/customize' },
    { label: 'Trash', icon: 'delete', route: '/trash' }
  ];

  setActiveLink(): void {
    const currentRoute = this.router.url.split('?')[0];
    const activeItem = this.menuItems.find(item => item.route === currentRoute);
    if (activeItem && activeItem.route) {
      this.activeLink = activeItem.route;
    } else {
      this.activeLink = '';
    }
  }


ngOnInit() {
  this.subscription.push(
    this.authData$.subscribe((authData) => {
      if (authData?.idToken) {
        this.authData = authData;
      }
    })
  );
}

login(){
    this.store.dispatch(AuthActions.login());
}

  logout(){
    this.auth.signOut()}
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }


}

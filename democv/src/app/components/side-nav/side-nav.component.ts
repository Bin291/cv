import {Component, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {NavigationEnd, RouterLink} from '@angular/router';
import {Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, user} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Router} from '@angular/router';
import {filter, Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../models/auth.model';
import * as AuthActions from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatIcon,
    MatButton,
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {
  activeLink: string = '';

  authData$ !:Observable<AuthModel|null>;
  subscription: Subscription[] = [];
  authData!: AuthModel |  null;
  selectedMenu = 'template'; // mặc định là template
  currentUsers : any;


  constructor(private auth: Auth, private store: Store<{
    auth: AuthState
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
    { label: 'Content', icon: 'attach_file', route: '/content' },
    { label: 'Customize', icon: 'content_cut', route: '/customize' },
    { label: 'Trash', icon: 'delete', route: '/trash' }
  ];

  setActiveLink(): void {
    const currentRoute = this.router.url.split('?')[0]; // Lấy URL hiện tại
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
        if (authData) {
          this.authData = authData;
          this.currentUsers = authData;
        } else {
          this.currentUsers = null;
        }
      })
    );
    this.store.select('auth').subscribe((auth) => {
      if (auth.authData) {
        this.currentUsers = auth.authData;
      } else {
        this.currentUsers = null;
      }
    });
}

  async loginWithGG(){
    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.currentUsers = credential.user;
    console.log(credential);
    // const token = await credential.user.getIdToken();
    // console.log(token);
  }

  logout(){
    this.auth.signOut().then(r =>
    console.log('logout success'));
  }

  //  async loginWithGG(){
  //   this.store.dispatch(AuthActions.login());
  // }





}

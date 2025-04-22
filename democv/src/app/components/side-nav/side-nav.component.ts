import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabButton} from '@angular/material/button';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Auth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, user} from '@angular/fire/auth';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatIcon,
    MatButton,
    NgClass,
    RouterLink
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  selectedMenu = 'template'; // mặc định là template
  currentUsers : any;


  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUsers = user;
        // console.log(user);
    })
  }

  async loginWithGG(){
    const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.currentUsers = credential.user;
    console.log(credential);
    // const token = await credential.user.getIdToken();
    // console.log(token);
  }

  logout(){
    this.auth.signOut();
  }


  protected readonly user = user;
}

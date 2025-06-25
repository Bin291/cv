import {Component, OnInit} from '@angular/core';
import {RouterOutlet, Route, Router} from '@angular/router';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {CVComponent} from './components/cv/cv.component';
import {NgIf} from '@angular/common';
import {ButtonThemeModeComponent} from './components/button-theme-mode/button-theme-mode.component';
import {DownloadBoxComponent} from './components/download-box/download-box.component';


@Component({
  selector: 'app-root',
  imports: [SideNavComponent, CVComponent, RouterOutlet, NgIf, ButtonThemeModeComponent, DownloadBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Easy CV';

  menuItems: { route: string }[] = [];
  activeLink: string = '';
  constructor(private router: Router) {
    this.menuItems = [
      { route: '' },
      { route: '/content' },
      { route: '/customize' },
      { route: '/trash' }
    ];
  }
  setActiveLink() {
    this.activeLink = this.router.url;
    // console.log('activeLink:', this.activeLink);
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.setActiveLink();
    });
  }

  isHome(): boolean {
    return this.router.url === '/' || this.router.url === '';

  }

}

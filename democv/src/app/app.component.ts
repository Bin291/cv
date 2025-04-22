import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CVComponent} from './components/cv/cv.component';


@Component({
  selector: 'app-root',
  imports: [SideNavComponent, CVComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'democv';
}

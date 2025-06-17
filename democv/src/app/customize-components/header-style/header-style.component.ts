import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
@Component({
  selector: 'app-header-style',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './header-style.component.html',
  styleUrl: './header-style.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class HeaderStyleComponent {
  selectedStyle = 'style1';
  selectedDetail = 'Icon';
  selectedShape = 'None';

  styles = ['style1', 'style2', 'style3'];
  details = ['Icon', 'Bullet', '| Bar'];
  shapes = ['None', 'Rounded', 'Square', 'Circle'];

  selectStyle(style: string) {
    this.selectedStyle = style;
  }

  selectDetail(detail: string) {
    this.selectedDetail = detail;
  }

  selectShape(shape: string) {
    this.selectedShape = shape;
  }
}

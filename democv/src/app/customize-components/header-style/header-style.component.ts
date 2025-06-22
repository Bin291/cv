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

import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-heading',
  imports: [
    NgForOf
  ],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss'
})
export class HeadingComponent {
  selectedStyle = 'style6';
  selectedCapitalization = 'Capitalize';
  selectedSize = 'S';
  selectedIcon = 'Outline';

  styles = ['style1', 'style2', 'style3', 'style4', 'style5', 'style6'];
  capitalizations = ['Capitalize', 'Uppercase'];
  sizes = ['S', 'M', 'L', 'XL'];
  icons = ['None', 'Outline', 'Filled'];

  selectStyle(style: string) {
    this.selectedStyle = style;
  }

  selectCapitalization(cap: string) {
    this.selectedCapitalization = cap;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }
}

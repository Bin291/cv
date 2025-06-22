import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-font',
  imports: [
    NgForOf
  ],
  templateUrl: './font.component.html',
  styleUrl: './font.component.scss'
})
export class FontComponent {
  @Output() fontChanged = new EventEmitter<string>();
  fontTypes = ['Serif', 'Sans', 'Mono'];
  fontFamilies = [
    'Source Sans Pro', 'Karla', 'Mulish',
    'Lato', 'Titillium Web', 'Work Sans',
    'Barlow', 'Jost', 'Fira Sans',
    'Roboto', 'Rubik', 'Asap',
    'Nunito', 'Open Sans', 'Lexend',
  ];

  selectedFontType = 'Sans';
  selectedFontFamily = 'Lexend';

  selectFontType(type: string) {
    this.selectedFontType = type;
  }

  selectFontFamily(font: string) {
    this.selectedFontFamily = font;
    this.fontChanged.emit(font);
  }
}

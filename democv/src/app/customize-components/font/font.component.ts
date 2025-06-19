import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FontService} from '../../services/font/font.service';

@Component({
  selector: 'app-font',
  imports: [
    NgForOf
  ],
  templateUrl: './font.component.html',
  styleUrl: './font.component.scss'
})
export class FontComponent {
  @Output() fontChange = new EventEmitter<string>();

  fontFamilies: string[] = [
    'Lexend', 'Roboto', 'Open Sans', 'Lato',
    'Caveat', 'Pacifico', 'Comfortaa', 'Lobster'
  ];

  selectedFontFamily = 'Roboto';
  fontTypes = ['Sans-serif', 'Serif', 'Handwritten'];
  selectedFontType = '';

  constructor(private fontService: FontService) {}

  selectFont(font: string): void {
    this.selectedFontFamily = font;
    this.fontService.setFontClass(font);
  }





  selectFontType(type: string): void {
    this.selectedFontType = type;
    // Nếu muốn lọc fontFamilies theo type thì xử lý tại đây
  }
}

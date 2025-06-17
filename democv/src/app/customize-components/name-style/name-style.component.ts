import { Component } from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';

@Component({
  selector: 'app-name-style',
  imports: [
    ShareModule
  ],
  templateUrl: './name-style.component.html',
  styleUrl: './name-style.component.scss'
})
export class NameStyleComponent {
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize = 'S';
  isBold = true;

  fontTab = 'Body'; // 'Body' or 'Creative'
  creativeFonts = [
    'Abril Fatface', 'Amatic SC', 'Bungee Shade',
    'Caveat', 'Caveat Brush', 'Comfortaa',
    'Elsie', 'Lobster', 'Pacifico',
    'Parisienne', 'Vibur'
  ];
  selectedCreativeFont = 'Comfortaa';


  selectCreativeFont(font: string) {
    this.selectedCreativeFont = font;
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }

  toggleBold() {
    this.isBold = !this.isBold;
  }

  selectFontTab(tab: string) {
    this.fontTab = tab;
  }


}

import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job-title',
  imports: [
    NgForOf
  ],
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.scss'
})
export class JobTitleComponent {
  sizes = ['S', 'M', 'L'];
  selectedSize = 'M';

  positions = ['Try Same Line', 'Below'];
  selectedPosition = 'Below';

  styles = ['Normal', 'Italic'];
  selectedStyle = 'Normal';

  selectSize(size: string) {
    this.selectedSize = size;
  }

  selectPosition(position: string) {
    this.selectedPosition = position;
  }

  selectStyle(style: string) {
    this.selectedStyle = style;
  }
}

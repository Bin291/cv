import {Component, EventEmitter, Output} from '@angular/core';
import {NgForOf} from '@angular/common';
import {StyleService} from '../../services/style/style.service';

@Component({
  selector: 'app-job-title',
  imports: [
    NgForOf
  ],
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.scss'
})
export class JobTitleComponent {
  constructor(private styleService: StyleService) {}
  @Output() sizeChange = new EventEmitter<string>();
  @Output() positionChange = new EventEmitter<string>();
  @Output() fontStyleChange = new EventEmitter<string>();


  selectSize(size: string) {
    this.selectedSize = size;
    this.styleService.updateSize(size);
  }

  selectPosition(pos: string) {
    this.selectedPosition = pos;
    this.styleService.updatePosition(pos);
  }

  selectStyle(style: string) {
    this.selectedStyle = style;
    this.styleService.updateFontStyle(style);
  }
  sizes = ['S', 'M', 'L'];
  selectedSize = 'M';

  positions = ['Try Same Line', 'Below'];
  selectedPosition = 'Below';

  styles = ['Normal', 'Italic'];
  selectedStyle = 'Normal';



}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {ImageShareService} from '../../services/image-share/image-share.service';
import {ShareModule} from '../../../shared/shared.module';

@Component({
  selector: 'app-content-form',
  imports: [
    MatIconButton,
    MatIcon,
    ShareModule,
    MatButton,
  ],
  templateUrl: './content-form.component.html',
  styleUrl: './content-form.component.scss'
})
export class ContentFormComponent  implements OnInit {
  years: number[] = [];
  selectedMonth: string = this.getCurrentMonth();
  SetMonthEnd: string = this.getCurrentMonth();
  selectedYearStart: number = new Date().getFullYear();
  selectedYearEnd: number = new Date().getFullYear();

  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];
  @Output() back = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private imageShareService: ImageShareService) {}

  ngOnInit(): void {
    this.generateYearsStart();
    this.generateYearsEnd();
  }

  generateYearsStart(): void {
    for (let y = 1990; y <= 2035; y++) {
      this.years.push(y);
    }
  }
  generateYearsEnd(): void {
    for (let y = 1990; y <= 2035; y++) {
      this.years.push(y);
    }
  }

  getCurrentMonth(): string {
    const month = new Date().getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }



}

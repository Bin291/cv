import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ImageShareService} from '../../services/image-share/image-share.service';
import {ShareModule} from '../../../shared/shared.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContentItem} from '../../models/resume.model';

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
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<ContentItem>();
  @Input() selectedContentName!: string;
  startDontShow = false;
  startOnlyYear = false;
  formValues: { [key: string]: string } = {};
  @Input() itemId?: number;
  present = false;
  endDontShow = false;
  endOnlyYear = false;
  title = '';
  subtitle = '';
  city = '';
  country = '';
  years: number[] = [];
  selectedMonth: string = this.getCurrentMonth();
  SetMonthEnd: string = this.getCurrentMonth();
  selectedYearStart: number = new Date().getFullYear();
  selectedYearEnd: number = new Date().getFullYear();
  @ViewChild('descBox', { static: true }) descBox!: ElementRef<HTMLDivElement>;

  descriptionHtml = '';
  newLink = '';
  showLinkInput1 = false;
  formConfigLarge: any = {
    Education: {
      title: 'Create Education',
      icon: 'school',
      fields: [
        { id: 'title', label: 'School', placeholder: 'Enter school / university' },
        { id: 'subtitle', label: 'Degree', placeholder: 'Enter Degree / Field Of Study' }
      ]
    },
    Projects: {
      title: 'Create Project',
      icon: 'code',
      fields: [
        { id: 'title', label: 'Project Name', placeholder: 'Enter project name' },
        { id: 'subtitle', label: 'Role', placeholder: 'Enter your role' }
      ]
    },
    'Professional Experience': {
      title: 'Add Experience',
      icon: 'work',
      fields: [
        { id: 'title', label: 'Company', placeholder: 'Enter company name' },
        { id: 'subtitle', label: 'Job Title', placeholder: 'Enter job title' }
      ]
    },
    Organisations: {
      title: 'Add Organisation',
      icon: 'group',
      fields: [
        { id: 'title', label: 'Organisation Name', placeholder: 'Enter organisation name' },
        { id: 'subtitle', label: 'Role', placeholder: 'Enter your role' }
      ]
    }
  };


  selectedConfig: any;

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

  constructor(private dialog: MatDialog, private imageShareService: ImageShareService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.generateYearsStart();
    this.generateYearsEnd();
    this.selectedConfig = this.formConfigLarge[this.selectedContentName];
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
  onDescriptionChange() {
    this.descriptionHtml = this.descBox.nativeElement.innerHTML;
  }

  exec(command: string) {
    document.execCommand(command, false);
  }

  insertLink() {
    const selection = window.getSelection();

    if (!selection) {
      this.snackBar.open('No selection available', 'Close', { duration: 3000 });
      return;
    }

    const selectedText = selection.toString();
    if (!selectedText || !selection.rangeCount || !this.newLink.trim()) {
      this.snackBar.open('Please select text to link', 'Close', { duration: 3000 });
      return;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const anchor = document.createElement('a');
    anchor.href = this.newLink.trim();
    anchor.textContent = selectedText;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';

    range.insertNode(anchor);

    this.showLinkInput1 = false;
    this.newLink = '';
    this.snackBar.open('Link inserted!', 'Close', { duration: 2000 });
  }
  resolveName(content: string, d: any): string {
    if (['Education', 'Professional Experience', 'Projects', 'Organizations'].includes(content)) {
      const title = d.title || '';
      const subtitle = d.subtitle ? ' – ' + d.subtitle : '';
      return `${title}${subtitle}` || 'Untitled';
    }

    return d.name || d.title || '';
  }


  cancelInsertLink() {
    this.showLinkInput1 = false;
    this.newLink = '';
  }

  formatText(command: string) {
    document.execCommand(command, false);
  }

  getData() {
    return {
      ...this.formValues, // đã bao gồm title, subtitle
      city: this.city || '',
      country: this.country || '',
      startMonth: this.selectedMonth,
      startYear: this.selectedYearStart,
      endMonth: this.SetMonthEnd,
      endYear: this.selectedYearEnd,
      startDontShow: this.startDontShow,
      startOnlyYear: this.startOnlyYear,
      endDontShow: this.endDontShow,
      endOnlyYear: this.endOnlyYear,
      present: this.present,
      description: this.getDescriptionText()
    };
  }


  getDescriptionText(): string {
    const el = document.getElementById('description');
    return el?.innerHTML || '';
  }

  patchData(data: any): void {
    this.formValues = {
      title: data.title || '',
      subtitle: data.subtitle || '',
      ...data
    };

    this.city = data.city || '';
    this.country = data.country || '';
    this.selectedMonth = data.startMonth;
    this.selectedYearStart = data.startYear;
    this.SetMonthEnd = data.endMonth;
    this.selectedYearEnd = data.endYear;
    this.startDontShow = data.startDontShow;
    this.startOnlyYear = data.startOnlyYear;
    this.endDontShow = data.endDontShow;
    this.endOnlyYear = data.endOnlyYear;
    this.present = data.present;

    setTimeout(() => {
      const el = document.getElementById('description');
      if (el) el.innerHTML = data.description || '';
    });
  }

  saveItem(): void {
    const descriptionEl = document.getElementById('description');
    const descriptionHTML = descriptionEl?.innerHTML || '';

    const newItem: ContentItem = {
      id: this.itemId ?? 0,
      ...this.formValues,
      city: this.city,
      country: this.country,
      startMonth: this.selectedMonth,
      startYear: this.selectedYearStart,
      startOnlyYear: this.startOnlyYear,
      startDontShow: this.startDontShow,
      endMonth: this.SetMonthEnd,
      endYear: this.selectedYearEnd,
      endOnlyYear: this.endOnlyYear,
      endDontShow: this.endDontShow,
      present: this.present,
      description: descriptionHTML,
    };
    this.save.emit(newItem);
  }



}

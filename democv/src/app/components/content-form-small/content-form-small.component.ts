import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ContentItem} from '../../models/resume.model';

type SmallFormKey =
    | 'Skills'
    | 'Languages'
    | 'Certificates'
    | 'Awards'
    | 'Publications';

interface SmallFormConfig {
  title: string;
  icon: string;
  nameLabel: string;
  namePlaceholder: string;
}
interface FormSmallModel {
  [key: string]: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-content-form-small',
  imports: [
    ShareModule,
    MatIconButton,
    MatIcon,
    MatButton,


  ],
  templateUrl: './content-form-small.component.html',
  styleUrl: './content-form-small.component.scss'
})
export class ContentFormSmallComponent implements OnInit{
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<ContentItem>();

  name = '';

  @Input() itemId?: number;
  selectedLevel = '';
  dropdownOpen = false;
  levels = ['Beginner', 'Amateur', 'Competent', 'Proficient', 'Expert'];
  @Input() selectedContentName!: string;
  newLink = '';
  showLinkInput = false;
  selectedConfig: any;
  @ViewChild('descInput') descInput!: ElementRef<HTMLDivElement>;
  descriptionHtml = '';
  formValues: FormSmallModel = {
    title: '',
    subtitle: ''
  };

  formConfigSmall: any = {
    Skills: {
      title: 'Add Skill',
      icon: 'psychology',
      fields: [
        { id: 'title', label: 'Skill', placeholder: 'Enter skill name' },
        { id: 'subtitle', label: 'Level', placeholder: 'Enter skill level' }
      ]
    },
    Languages: {
      title: 'Add Language',
      icon: 'language',
      fields: [
        { id: 'title', label: 'Language', placeholder: 'Enter language' },
        { id: 'subtitle', label: 'Level', placeholder: 'Enter fluency level' }
      ]
    },
    Certificates: {
      title: 'Add Certificate',
      icon: 'verified',
      fields: [
        { id: 'title', label: 'Certificate Name', placeholder: 'Enter name' },
        { id: 'subtitle', label: 'Issuer', placeholder: 'Enter organization' }
      ]
    },
    Awards: {
      title: 'Add Award',
      icon: 'emoji_events',
      fields: [
        { id: 'title', label: 'Award Title', placeholder: 'Enter award name' },
        { id: 'subtitle', label: 'Event', placeholder: 'Enter event or competition' }
      ]
    },
    Publications: {
      title: 'Add Publication',
      icon: 'article',
      fields: [
        { id: 'title', label: 'Publication Title', placeholder: 'Enter title' },
        { id: 'subtitle', label: 'Publisher', placeholder: 'Enter publisher or journal' }
      ]
    }
  };


  ngOnInit(): void {
    this.selectedConfig = this.formConfigSmall[this.selectedContentName as SmallFormKey];
  }

  toggleFormat(command: string) {
    document.execCommand(command, false, undefined);
  }

  insertLink() {
    if (this.newLink) {
      const url = this.newLink.trim();
      document.execCommand('createLink', false, url);
      this.newLink = '';
      this.showLinkInput = false;
    }


  }

  onContentChange() {
    this.descriptionHtml = this.descInput.nativeElement.innerHTML;
  }
  setDirection(dir: 'ltr' | 'rtl') {
    this.descInput.nativeElement.setAttribute('dir', dir);
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLevel(level: string) {
    this.selectedLevel = level;
    this.dropdownOpen = false;
  }

  getFormattedHtml(): string {
    const el = this.descInput?.nativeElement;
    return el?.innerHTML || '';
  }

  getData() {
    return {
      ...this.formValues,
      title: this.formValues['title'] || '',
      subtitle: this.formValues['subtitle'] || '',
      description: this.getFormattedHtml()
    };
  }

  patchData(data: any) {
    this.formValues = {
      title: data.title || '',
      subtitle: data.subtitle || '',
      ...data
    };

    setTimeout(() => {
      const el = document.getElementById('description');
      if (el) el.innerHTML = data.description || '';
    });
  }


  getDescriptionText(): string {
    const el = document.getElementById('description');
    return el?.innerHTML || '';
  }
  saveItem(): void {
    const descriptionEl = document.getElementById('description');
    const descriptionHTML = descriptionEl?.innerHTML || '';

    const newItem: ContentItem = {
      id: this.itemId ?? 0,
      title: this.formValues.title,
      subtitle: this.formValues.subtitle,
      level: this.selectedLevel,
      description: descriptionHTML,
    };

    this.save.emit(newItem);
  }

  // cancel() {
  //   this.skill = '';
  //   this.descriptionHtml = '';
  //   this.selectedLevel = '';
  // }
  //
  // save() {
  //   console.log({
  //     skill: this.skill,
  //     description: this.descriptionHtml,
  //     level: this.selectedLevel
  //   });
  // }
}

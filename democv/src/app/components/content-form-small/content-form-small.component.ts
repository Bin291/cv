import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

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
  @Output() save = new EventEmitter<void>();
  skill = '';
  selectedLevel = '';
  dropdownOpen = false;
  levels = ['Beginner', 'Amateur', 'Competent', 'Proficient', 'Expert'];
  @Input() selectedContentName!: string;
  newLink = '';
  showLinkInput = false;
  selectedConfig: any;
  @ViewChild('descInput') descInput!: ElementRef<HTMLDivElement>;
  descriptionHtml = '';
  formConfigSmall = {
    Skills: {
      title: 'Create Skill',
      icon: 'accessible_forward',
      label: 'Skill',
      placeholder: 'Skill name',
      subLabel: 'Information / Sub-skills',
      levelLabel: 'Select skill level'
    },
    Languages: {
      title: 'Add Language',
      icon: 'language',
      label: 'Language',
      placeholder: 'Enter language name',
      subLabel: 'Fluency / Notes',
      levelLabel: 'Proficiency level'
    },
    Certificates: {
      title: 'Add Certificate',
      icon: 'workspace_premium',
      label: 'Certificate',
      placeholder: 'Certificate name',
      subLabel: 'Issuing Organization',
      levelLabel: 'Level (optional)'
    },
    Awards: {
      title: 'Add Award',
      icon: 'emoji_events',
      label: 'Award Name',
      placeholder: 'What did you win?',
      subLabel: 'Context / Organizer',
      levelLabel: 'Level (optional)'
    },
    Publications: {
      title: 'Add Publication',
      icon: 'menu_book',
      label: 'Title',
      placeholder: 'Name of publication',
      subLabel: 'Authors / Summary',
      levelLabel: 'Type (e.g. Journal, Book)'
    },
    Organisations: {
      title: 'Add Organization',
      icon: 'business',
      label: 'Organization Name',
      placeholder: 'Name of organization',
      subLabel: 'Role / Description',
      levelLabel: 'Type (e.g. Non-profit, Company)'
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

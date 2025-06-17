import {Component, ElementRef, ViewChild} from '@angular/core';
import {ShareModule} from '../../../shared/shared.module';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

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
export class ContentFormSmallComponent {
  skill = '';
  selectedLevel = '';
  dropdownOpen = false;
  levels = ['Beginner', 'Amateur', 'Competent', 'Proficient', 'Expert'];

  newLink = '';
  newLabel = '';
  showLinkInput = false;

  @ViewChild('descInput') descInput!: ElementRef<HTMLDivElement>;
  descriptionHtml = '';


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

  cancel() {
    this.skill = '';
    this.descriptionHtml = '';
    this.selectedLevel = '';
  }

  save() {
    console.log({
      skill: this.skill,
      description: this.descriptionHtml,
      level: this.selectedLevel
    });
  }
}

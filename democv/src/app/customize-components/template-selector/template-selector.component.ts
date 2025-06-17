import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-template-selector',
  imports: [
    NgForOf
  ],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.scss'
})
export class TemplateSelectorComponent {
  templates = Array(6).fill(0).map((_, i) => `Template ${i + 1}`);

  selectTemplate(template: string) {
    alert(`Selected: ${template}`);
  }

  seeAllTemplates() {
    alert('Redirecting to all templates...');
  }
}

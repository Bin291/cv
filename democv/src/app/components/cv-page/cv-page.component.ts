import {Component, Input} from '@angular/core';
import {ResumeModel} from '../../models/resume.model';

@Component({
  selector: 'app-cv-page',
  imports: [],
  templateUrl: './cv-page.component.html',
  styleUrl: './cv-page.component.scss'
})
export class CvPageComponent {
  @Input() resume!: ResumeModel;
  @Input() contents: any[] = [];
}

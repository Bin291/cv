import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {ThemeService} from '../../services/theme/theme.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-template-selector',
    imports: [
        MatAnchor,
        NgForOf
    ],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.scss'
})
export class TemplateSelectorComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  // templates = [
  //   { image: 'https://prod.flowcvassets.com/resume-templates/wk78myowij2vvh1gy8l-s/2560.webp', name: 'image' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/gs_qryrzly3kldmqhxqsb/2560.webp' , name: 'no'},
  //   { image: 'https://prod.flowcvassets.com/resume-templates/pgcuzlm0skbwabfnppg3b/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/yrf-1jligslm-ta_zmyji/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/cjy7ca_q8xpaocheef8v1/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/_xarkap79m3qjwh4w8ztg/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/yivr5ujjrocluhf4nbdul/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/um2ccnj8x3bimdnzzrml8/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/free-multi-column-resume-template/1280.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/aolmyzzk7frcnkmzjiicp/2560.webp' },
  //   { image: 'https://prod.flowcvassets.com/resume-templates/j-o1yjhppnqj64rc5ads0/2560.webp' },
  //
  // ];
  templates = [
    { name: 'brian', image: 'https://prod.flowcvassets.com/resume-templates/wk78myowij2vvh1gy8l-s/2560.webp' },
    { name: 'andrew', image: 'https://prod.flowcvassets.com/resume-templates/gs_qryrzly3kldmqhxqsb/2560.webp' },
  ];




  constructor(private themeService: ThemeService,private store: Store<any>) {}

  // selectTemplate(name: string) {
  //   this.themeService.applyTemplate(name);
  // }
  selectTemplate(name: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cv_template', name);
      const event = new CustomEvent('cv-template-change', { detail: name });
      window.dispatchEvent(event);
    }
  }
}

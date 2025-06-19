import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import { map, Observable } from 'rxjs';
import {AsyncPipe, isPlatformBrowser, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import { ResumeModel } from '../../models/resume.model';
import { select, Store } from '@ngrx/store';
import { ResumeState } from '../../ngrx/resume/resume.state';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';
import { loadResume } from '../../ngrx/resume/resume.action';
import { LinkState } from '../../ngrx/link/link.state';
import { LinkModel } from '../../models/link.model';
import * as LinkActions from '../../ngrx/link/link.actions';
import { ResumeService } from '../../services/resume/resume.service';
import {FontService} from '../../services/font/font.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    MatCardModule,
    MatIconModule,
    LetDirective,
    NgForOf,
    AsyncPipe,
    NgClass,
    NgStyle
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit, OnDestroy {
  resume$!: Observable<ResumeModel | null>;
  links$!: Observable<LinkModel[]>;
  fontClass = 'font-Lexend';
  fontFamily: string = 'Roboto, sans-serif';
  isBrowser: boolean | undefined;
  // templateClass: 'with-image' | 'no-image' = 'with-image'; // Default: dùng avatar
  templateClass: string = 'template-brian';
  constructor(
    private store: Store<{ resume: ResumeState; link: LinkState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private resumeService: ResumeService,
    private fontService: FontService
  ) {
    this.resume$ = this.store.select(state => state.resume.resume);
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.links$ = this.resume$.pipe(
      map(resume => {
        try {
          const rawLinks = typeof resume?.links === 'string'
            ? JSON.parse(resume.links)
            : resume?.links || [];

          return rawLinks.filter((link: LinkModel) => !!link.name?.trim());
        } catch (e) {
          console.error('Parse error links:', e);
          return [];
        }
      })
    );
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        this.store.dispatch(loadResume({ id: resumeId }));
        this.store.dispatch(LinkActions.loadLinks({ resumeId }));
      }

      const savedTemplate = localStorage.getItem('cv_template') as 'with-image' | 'no-image';
      if (savedTemplate) {
        this.templateClass = savedTemplate;
      }
    }
    if (this.isBrowser) {
      const saved = localStorage.getItem('cv_template');
      if (saved) this.templateClass = `template-${saved}`;

      window.addEventListener('cv-template-change', this.handleTemplateChange);
    }
    if (isPlatformBrowser(this.platformId)) {
      const font = localStorage.getItem('cv_font');
      if (font) {
        document.documentElement.style.setProperty('--cv-font-family', font);
      }
    }
    this.fontService.font$.subscribe(font => {
      this.fontClass = 'font-' + font.replace(/\s+/g, '-');
    });

  }



  handleTemplateChange = (e: any) => {
    if (this.isBrowser) {
      this.templateClass = `template-${e.detail}`;
      localStorage.setItem('cv_template', e.detail);
    }
  };


  // Có thể gọi khi người dùng chọn template (nếu gắn selector):
  switchTemplate(template: 'with-image' | 'no-image') {
    this.templateClass = template;
    localStorage.setItem('cv_template', template);
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('cv-template-change', this.handleTemplateChange);
    }
  }
}

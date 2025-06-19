import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { ResumeContent, ResumeModel } from '../../models/resume.model';
import { Store } from '@ngrx/store';
import { ResumeState } from '../../ngrx/resume/resume.state';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { loadResume } from '../../ngrx/resume/resume.action';
import { LinkState } from '../../ngrx/link/link.state';
import { LinkModel } from '../../models/link.model';
import * as LinkActions from '../../ngrx/link/link.actions';
import { ResumeService } from '../../services/resume/resume.service';
import { FontService } from '../../services/font/font.service';
import { CvPageComponent } from '../cv-page/cv-page.component';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgForOf,
    AsyncPipe,
    CvPageComponent,
    NgIf,
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit, OnDestroy {
  resume$!: Observable<ResumeModel | null>;
  links$!: Observable<LinkModel[]>;
  fontClass = '';
  pages: ResumeContent[][] = [];
  isBrowser: boolean;
  templateClass: string = 'template-brian';
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<{ resume: ResumeState; link: LinkState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private resumeService: ResumeService,
    private fontService: FontService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.resume$ = this.store.select(state => state.resume.resume);

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

  ngOnInit(): void {
    if (this.isBrowser) {
      const resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        this.store.dispatch(loadResume({ id: resumeId }));
        this.store.dispatch(LinkActions.loadLinks({ resumeId }));
      }

      const savedTemplate = localStorage.getItem('cv_template');
      if (savedTemplate) {
        this.templateClass = `template-${savedTemplate}`;
      }

      const font = localStorage.getItem('cv_font');
      if (font) {
        document.documentElement.style.setProperty('--cv-font-family', font);
      }

      window.addEventListener('cv-template-change', this.handleTemplateChange);
    }

    const fontSub = this.fontService.fontClass$.subscribe(font => {
      this.fontClass = font;
    });

    const resumeSub = this.resume$.subscribe(resume => {
      if (resume?.contents) {
        this.splitIntoPages(resume.contents);
      }
    });

    this.subscriptions.push(fontSub, resumeSub);
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('cv-template-change', this.handleTemplateChange);
    }
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleTemplateChange = (e: any) => {
    if (this.isBrowser) {
      this.templateClass = `template-${e.detail}`;
      localStorage.setItem('cv_template', e.detail);
    }
  };

  private splitIntoPages(sections: ResumeContent[]): void {
    const pageHeight = 1000;
    const pages: ResumeContent[][] = [];

    let currentPage: ResumeContent[] = [];
    let currentHeight = 0;

    for (const section of sections) {
      const estHeight = this.estimateSectionHeight(section);
      if (currentHeight + estHeight > pageHeight) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(section);
      currentHeight += estHeight;
    }

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    this.pages = pages;
  }

  private estimateSectionHeight(section: ResumeContent): number {
    const base = 100;
    const perLine = 22;
    const lines = (section.data || []).reduce((acc, item) => {
      const desc = item.description || '';
      return acc + Math.ceil(desc.length / 100);
    }, 0);
    return base + perLine * lines;
  }

  switchTemplate(template: 'with-image' | 'no-image') {
    this.templateClass = template;
    localStorage.setItem('cv_template', template);
  }
}

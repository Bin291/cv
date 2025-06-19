import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChildren
} from '@angular/core';
import {ResumeModel} from '../../models/resume.model';
import {LinkModel} from '../../models/link.model';
import {AsyncPipe, isPlatformBrowser, NgClass, NgForOf, NgIf} from '@angular/common';
import {map, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {LinkState} from '../../ngrx/link/link.state';
import {ResumeService} from '../../services/resume/resume.service';
import {FontService} from '../../services/font/font.service';
import {loadResume} from '../../ngrx/resume/resume.action';
import * as LinkActions from '../../ngrx/link/link.actions';
import {MatIcon} from '@angular/material/icon';
import {MatCardSubtitle} from '@angular/material/card';
import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'app-cv-page',
  imports: [
    NgClass,
    NgForOf,
    MatIcon,
    MatCardSubtitle,
    NgIf,
    LetDirective,
    AsyncPipe
  ],
  templateUrl: './cv-page.component.html',
  styleUrl: './cv-page.component.scss'
})
export class CvPageComponent implements OnInit, OnDestroy{
  @Input() sections: any[] = [];
  @ViewChildren('sectionBlock', { read: ElementRef }) sectionBlocks!: QueryList<ElementRef>;

  @Input() resume: ResumeModel | null = null;
  @Input() links: LinkModel[] = [];
  resume$!: Observable<ResumeModel | null>;
  links$!: Observable<LinkModel[]>;
  fontClass = '';
  @Input() showHeader = false;
  @Input() isFirstPage = false;

  MAX_SECTION_PER_PAGE = 3; // tùy chỉnh theo chiều cao layout
  pages: any[][] = [];
  isBrowser: boolean | undefined;
  // templateClass: 'with-image' | 'no-image' = 'with-image'; // Default: dùng avatar
  templateClass: string = 'template-brian';
  selectedFontFamily = 'Roboto, sans-serif';
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

      const font = localStorage.getItem('cv_font');
      if (font) {
        document.documentElement.style.setProperty('--cv-font-family', font);
      }
    }

    if (this.isBrowser) {
      const saved = localStorage.getItem('cv_template');
      if (saved) this.templateClass = `template-${saved}`;

      window.addEventListener('cv-template-change', this.handleTemplateChange);
    }

    this.fontService.fontClass$.subscribe(font => {
      this.fontClass = font;
    });
  }

  get sectionCount(): number {
    return this.sections.length;
  }
  handleTemplateChange = (e: any) => {
    if (this.isBrowser) {
      this.templateClass = `template-${e.detail}`;
      localStorage.setItem('cv_template', e.detail);
    }
  };


  switchTemplate(template: 'with-image' | 'no-image') {
    this.templateClass = template;
    localStorage.setItem('cv_template', template);
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('cv-template-change', this.handleTemplateChange);
    }
    setTimeout(() => {
      const sectionHeights = this.sectionBlocks.map(s => s.nativeElement.offsetHeight);
      console.log('Height per section:', sectionHeights);
    });
  }
}

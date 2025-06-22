import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {
  map,
  Observable
} from 'rxjs';
import {
  AsyncPipe,
  isPlatformBrowser,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle
} from '@angular/common';
import { ResumeModel } from '../../models/resume.model';
import { Store } from '@ngrx/store';
import { ResumeState } from '../../ngrx/resume/resume.state';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatIconModule
} from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';
import { loadResume } from '../../ngrx/resume/resume.action';
import { LinkState } from '../../ngrx/link/link.state';
import { LinkModel } from '../../models/link.model';
import * as LinkActions from '../../ngrx/link/link.actions';
import { ResumeService } from '../../services/resume/resume.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatCardModule,
    LetDirective,
    NgForOf,
    AsyncPipe,
    NgClass,

  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit, OnDestroy {
  resume$!: Observable<ResumeModel | null>;
  links$!: Observable<LinkModel[]>;
  isBrowser: boolean;
  selectedFontClass = '';
  templateClass: string = 'template-brian';
  fontFamily: string = 'Lexend';

  constructor(
    private store: Store<{ resume: ResumeState; link: LinkState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private resumeService: ResumeService
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

      const savedFont = localStorage.getItem('cv_font');
      if (savedFont) {
        this.applyFontClass(savedFont);
      }

      window.addEventListener('cv-template-change', this.handleTemplateChange);
    }

    this.store.select(state => state.resume.selectedFont).subscribe(font => {
      if (font) {
        this.applyFontClass(font);
        if (this.isBrowser) {
          localStorage.setItem('cv_font', font);
        }
      }
    });
  }

  applyFontClass(font: string) {
    this.fontFamily = font;
    this.selectedFontClass = `font-${font.replace(/\s+/g, '')}`; // ⚠️ không dấu -
  }

  handleTemplateChange = (e: any) => {
    if (this.isBrowser) {
      this.templateClass = `template-${e.detail}`;
      localStorage.setItem('cv_template', e.detail);
    }
  };

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('cv-template-change', this.handleTemplateChange);
    }
  }
}

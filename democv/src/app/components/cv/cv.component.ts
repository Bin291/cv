import {
  Component,
  Inject, Input,
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
import {FontService} from '../../services/font/font.service';
import {StyleService} from '../../services/style/style.service';

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
    NgStyle,

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
  selectedSize = 'S';
  selectedPosition = 'Try Same Line';
  selectedStyle = 'Normal';

  size: string = 'M';
  position: string = 'Below';
  fontStyle: string = 'Normal';
  fontSize: number = 30;
  lineHeight: number = 1.5;
  marginX: number = 12;
  marginY: number = 20;
  spacingBetween: number = 16;

  constructor(
    private store: Store<{ resume: ResumeState; link: LinkState }>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private resumeService: ResumeService,
    private fontService: FontService,
    private styleService: StyleService
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
  setFontClass(font: string) {
    this.selectedFontClass = `font-${font.replace(/\s+/g, '')}`;
    console.log('[FONT] Class font đang áp dụng:', this.selectedFontClass);
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      const resumeId = localStorage.getItem('resume_id');
      if (resumeId) {
        this.store.dispatch(loadResume({ id: resumeId }));
        this.store.dispatch(LinkActions.loadLinks({ resumeId }));
      }

      // Khởi tạo template
      const savedTemplate = localStorage.getItem('cv_template');
      if (savedTemplate) {
        this.templateClass = `template-${savedTemplate}`;
      }

      // Lắng nghe thay đổi font từ FontService
      this.fontService.fontClass$.subscribe(fontClass => {
        this.selectedFontClass = fontClass;
        console.log('[CV] 🔠 Font class áp dụng:', fontClass);
      });

      // Lắng nghe thay đổi từ Store (NGRX)
      this.store.select(state => state.resume.selectedFont).subscribe(font => {
        if (font) {
          this.fontService.setFont(font); // Trigger fontClass$ luôn
          localStorage.setItem('cv_font', font);
        }
      });

      window.addEventListener('cv-template-change', this.handleTemplateChange);
    }

    this.styleService.size$.subscribe(val => this.size = val);
    this.styleService.position$.subscribe(val => this.position = val);
    this.styleService.fontStyle$.subscribe(val => {
      this.fontStyle = val;
      console.log('fontStyle nhận:', val); // Kiểm tra log
    });
    this.styleService.fontSize$.subscribe(v => this.fontSize = v);
    this.styleService.lineHeight$.subscribe(v => this.lineHeight = v);
    this.styleService.marginX$.subscribe(v => this.marginX = v);
    this.styleService.marginY$.subscribe(v => this.marginY = v);
    this.styleService.spacingBetween$.subscribe(v => this.spacingBetween = v);
  }


  applyFontClass(font: string) {
    this.fontFamily = font;
    this.selectedFontClass = `font-${font.replace(/\s+/g, '')}`;
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
  get jobTitleClass(): string[] {
    return [
      `job-size-${this.size}`,
      `job-position-${this.position.replace(/ /g, '-')}`,
      this.fontStyle === 'Italic' ? 'italic' : 'normal'
    ];
  }



}

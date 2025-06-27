// customize.component.ts
import {Component, OnInit} from '@angular/core';
import { FontComponent } from '../../customize-components/font/font.component';
import { JobTitleComponent } from '../../customize-components/job-title/job-title.component';
import { TemplateSelectorComponent } from '../../customize-components/template-selector/template-selector.component';
import { SpacingControlComponent } from '../../customize-components/spacing-control/spacing-control.component';
import { StyleService } from '../../services/style/style.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {ResumeModel} from '../../models/resume.model';
import {ResumeService} from '../../services/resume/resume.service';
import {Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';

@Component({
  selector: 'app-customize',
  imports: [
    FontComponent,
    JobTitleComponent,
    TemplateSelectorComponent,
    SpacingControlComponent
  ],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.scss'
})
export class CustomizeComponent implements OnInit{
  size: string = 'M';
  position: string = 'Below';
  fontStyle: string = 'Normal';
  resumeId: string = '';

  resume$!: Observable<ResumeModel | null>;
  resumeData!: ResumeModel[];
  subscription: Subscription[] = []

  ngOnInit() {
    this.subscription.push(
      this.resume$.subscribe((resume) => {
        if (resume) {
          this.resumeData = [resume];
          this.resumeId = resume.id!;
          // ✅ Lấy đúng từ store sau khi đã load thành công
          console.log('[Customize] resumeData =', this.resumeData);
          console.log('[Customize] resumeId =', this.resumeId);
        } else {
          console.warn('[Customize] No resume data found');
        }
      })
    );
  }

  constructor(private styleService: StyleService,private route: ActivatedRoute, private resumeService: ResumeService, private store: Store<{ resume: ResumeState}>) {
    this.resume$ = this.store.select('resume','resume');

  }

  onSizeChange(newSize: string) {
    this.size = newSize;
  }

  onPositionChange(newPosition: string) {
    this.position = newPosition;
  }

  onFontStyleChange(newStyle: string) {
    this.fontStyle = newStyle;
  }

  // onSpacingChange(key: string, value: number) {
  //   switch (key) {
  //     case 'fontSize':
  //       this.styleService.updateFontSize(value);
  //       break;
  //     case 'lineHeight':
  //       this.styleService.updateLineHeight(value);
  //       break;
  //     case 'marginX':
  //       this.styleService.updateMarginX(value);
  //       break;
  //     case 'marginY':
  //       this.styleService.updateMarginY(value);
  //       break;
  //     case 'spacingBetween':
  //       this.styleService.updateSpacingBetween(value);
  //       break;
  //   }
  // }
}

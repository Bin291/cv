import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe, isPlatformBrowser, NgForOf, NgIf} from '@angular/common';
import {ResumeModel} from '../../models/resume.model';
import {select, Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {LetDirective} from '@ngrx/component';
import {loadResume} from '../../ngrx/resume/resume.action';

@Component({
  selector: 'app-cv',
  imports: [
    NgIf,
    MatIcon,
    MatCardModule,
    MatIconModule,
    LetDirective,

  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit{
  resume$ !: Observable<ResumeModel | null>

  constructor(
    private store: Store<{ resume: ResumeState }>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.resume$ = this.store.pipe(select(state => state.resume.resume));

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('resume_id');
      if (id) {
        this.store.dispatch(loadResume({ id }));
      }
    }
  }

}

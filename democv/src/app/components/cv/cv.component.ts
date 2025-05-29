import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {ResumeModel} from '../../models/resume.model';
import {select, Store} from '@ngrx/store';
import {ResumeState} from '../../ngrx/resume/resume.state';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {LetDirective} from '@ngrx/component';

@Component({
  selector: 'app-cv',
  imports: [
    NgIf,
    AsyncPipe,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatIcon,
    MatCardModule,   // ✅ thêm đầy đủ module card
    MatIconModule,
    LetDirective
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CVComponent implements OnInit{
  resume$!: Observable<ResumeModel | null>;

  constructor(private store: Store<{ resume: ResumeState }>) {}

  ngOnInit(): void {
    this.resume$ = this.store.pipe(select(state => state.resume.resume));
  }

}

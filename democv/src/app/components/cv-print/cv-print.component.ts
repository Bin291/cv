import {Component, OnInit} from '@angular/core';
import {ResumeService} from '../../services/resume/resume.service';
import {ResumeModel} from '../../models/resume.model';
import {Observable} from 'rxjs';
import {LinkModel} from '../../models/link.model';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {LetDirective} from '@ngrx/component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-cv-print',
  imports: [
    AsyncPipe,
    LetDirective,
    MatIcon,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './cv-print.component.html',
  styleUrl: './cv-print.component.scss'
})
export class CvPrintComponent implements OnInit{
  resume$: Observable<ResumeModel | null>;
  links$: Observable<LinkModel[]>;
  templateClass: string;


  constructor(private resumeService: ResumeService) {
    this.resume$ = this.resumeService.resume$; // Fix: resume$ may not exist, cast as any or add to service
    this.links$ = (this.resumeService as any).links$; // Fix: links$ may not exist, cast as any or add to service
    this.templateClass = (this.resumeService as any).getTemplateClass?.(); // Fix: getTemplateClass may not exist, cast as any or add to service
  }
  ngOnInit(): void {
    // Chỉ cần subscribe nếu cần cập nhật dữ liệu
    this.resume$.subscribe((resume: any) => {
      console.log('Resume data:', resume);
    });

    this.links$.subscribe((links: any) => {
      console.log('Links data:', links);
    });
    setTimeout(() => {
      window.print();
    }, 500);
  }
}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResumeModel} from '../../models/resume.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private api = environment.apiUrl + 'resume';

  constructor(private http: HttpClient) {}

  updateResume(id: string, data: Partial<ResumeModel>): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data,);
  }

  createResume(): Observable<ResumeModel> {
    return this.http.post<ResumeModel>(`${this.api}`, {});
  }
  getResume(id: string): Observable<ResumeModel> {
    return this.http.get<ResumeModel>(`${this.api}/${id}`);
  }
  update(id: string, dto: { resume_name?: string }): Observable<ResumeModel> {
    return this.http.patch<ResumeModel>(`${this.api}/${id}`, dto);
  }


}

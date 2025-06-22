import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResumeModel} from '../../models/resume.model';
import {Observable, BehaviorSubject, switchMap, throwError, from} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {LinkModel} from '../../models/link.model';
@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private _resume$ = new BehaviorSubject<ResumeModel | null>(null);
  resume$ = this._resume$.asObservable();
  private api = environment.apiUrl + 'resume';
  constructor(private http: HttpClient, private authService: AuthService) {}
  updateResume(id: string, data: Partial<ResumeModel>): Observable<ResumeModel> {
    return this.http.patch<ResumeModel>(`${this.api}/${id}`, data)
      .pipe(
        tap(r => this._resume$.next(  r))
      );
  }
  createResume(data: Partial<ResumeModel>): Observable<ResumeModel> {
    return this.authService.getCurrentUser().pipe(
      take(1),
      switchMap(u => u
        ? from(u.getIdToken())
        : throwError(() => new Error('Not authenticated'))
      ),
      switchMap(token =>
        this.authService.getAuth(token).pipe(          // verify token với backend
          take(1),
          switchMap(() =>
            this.http.post<ResumeModel>(
              this.api,
              data,
              { headers: { Authorization: token } }
            )
          )
        )
      )
    );
  }
  getResume(id: string): Observable<ResumeModel> {
    return this.http.get<ResumeModel>(`${this.api}/${id}`);
  }
  update(id: string, dto: { resume_name?: string }): Observable<ResumeModel> {
    return this.http.patch<ResumeModel>(`${this.api}/${id}`, dto);
  }
  getMyResumes(uid: string): Observable<ResumeModel[]> {
    // http://…/resume/user/:uid
    return this.http.get<ResumeModel[]>(`${this.api}/user/${uid}`, {
      headers: { Authorization: `Bearer ${this.authToken()}` }
    });
  }
  private authToken(): string {
    return localStorage.getItem('idToken') || '';
  }
  getAllByUser(uid: string): Observable<ResumeModel[]> {
    return this.http.get<ResumeModel[]>(`${this.api}/${uid}`);
  }
  deleteResume(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`, {
      headers: { Authorization: `Bearer ${this.authToken()}` }
    });
  }
  getResumeLinks(id: string): Observable<LinkModel[]> {
    return this.http.get<LinkModel[]>(`${this.api}/${id}/links`);
  }
}

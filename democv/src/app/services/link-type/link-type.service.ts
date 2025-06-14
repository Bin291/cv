import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, switchMap} from 'rxjs';
import {LinkModel} from '../../models/link.model';

@Injectable({
  providedIn: 'root'
})
export class LinkTypeService {

  private base = environment.apiUrl + 'links' ;


  constructor(private http: HttpClient) {}

  // GET /links/resume/:resumeId
  loadAll(resumeId: string): Observable<LinkModel[]> {
    return this.http.get<LinkModel[]>(`${this.base}/resume/${resumeId}`);
  }

  // POST /links
  create(payload: Partial<LinkModel>): Observable<LinkModel> {
    return this.http.post<LinkModel>(this.base, payload);
  }

  // PATCH /links/:id
  update(id: number, changes: Partial<LinkModel>): Observable<LinkModel> {
    return this.http.patch<LinkModel>(`${this.base}/${id}`, changes);
  }

  // DELETE /links/:id
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  // DELETE /links/resume/:resumeId
  removeAll(resumeId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/resume/${resumeId}`);
  }
  upsertLinks(
    resumeId: string,
    links: Array<{ id: number; url: string; name?: string , icon?: string }>,
  ): Observable<LinkModel[]> {
    return this.removeAll(resumeId).pipe(
      switchMap(() => {
        const calls: Observable<LinkModel>[] = links.map(l =>
          this.create({
            resume_id:    resumeId,
            id: l.id,
            value:        l.url,
            icon:         l.icon,

            // nếu l.name là chuỗi thì trim, còn không có thì để undefined
            name:         l.name?.trim()  ,

          })
        );
        return forkJoin(calls);
      })
    );
  }

}

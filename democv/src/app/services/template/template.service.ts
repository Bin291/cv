import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateModel } from '../../models/template.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  private baseUrl = `${environment.apiUrl}template`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TemplateModel[]> {
    return this.http.get<TemplateModel[]>(this.baseUrl);
  }
  getOne(id: string, uid: string): Observable<TemplateModel> {
    const params = new HttpParams().set('uid', uid);
    return this.http.get<TemplateModel>(`${this.baseUrl}/${id}`, { params });
  }

  create(): Observable<TemplateModel> {
    return this.http.post<TemplateModel>(this.baseUrl, {});
  }

  update(id: string, uid: string, dto: Partial<TemplateModel>): Observable<TemplateModel> {
    const params = new HttpParams().set('uid', uid);
    return this.http.patch<TemplateModel>(`${this.baseUrl}/${id}`, dto, { params });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {BehaviorSubject, from, map, Observable, switchMap} from 'rxjs';
import { StyleConfig } from '../../models/style-setting.model';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly baseUrl = 'http://localhost:3000/style-settings';
  private styleSubject = new BehaviorSubject<StyleConfig>({});
  style$ = this.styleSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): Observable<HttpHeaders> {
    return from(this.auth.getIdToken()).pipe(
      map(token => new HttpHeaders({ Authorization: `Bearer ${token}` }))
    );
  }

  // ✅ GET /style-settings/resume/:resumeId
  loadStyle(resumeId: string): Observable<{ style: StyleConfig }> {

    return this.getHeaders().pipe(

      switchMap(headers =>
        this.http.get<{ style: StyleConfig }>(
          `${this.baseUrl}/resume/${resumeId}`,
          { headers }
        )
      )
    );
  }


  emitLocalStyle(patch: Partial<StyleConfig>) {
    const current = this.styleSubject.value;
    const merged = { ...current, ...patch };
    this.styleSubject.next(merged);
  }

// ✅ Hàm này để lấy state hiện tại
  getCurrentStyle(): StyleConfig {
    return this.styleSubject.value;
  }


  // ✅ PATCH /style-settings/resume/:resumeId
  saveStyle(resumeId: string, patch: Partial<StyleConfig>): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers =>
        this.http.patch(
          `${this.baseUrl}/resume/${resumeId}`,
          { style: patch },
          { headers }
        ).pipe(
          map(response => {
            this.emitLocalStyle(patch); // 💡 Emit ngay sau khi PATCH thành công
            return response;
          })
        )
      )
    );
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly baseUrl = 'http://localhost:3000/style-settings';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private async getHeaders(): Promise<HttpHeaders> {
    const token = await this.auth.getIdToken(); // 👈 đảm bảo có hàm getIdToken trong AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async getByResumeId(resumeId: string) {
    const headers = await this.getHeaders();
    return this.http.get<any>(`${this.baseUrl}/${resumeId}`, { headers });
  }

  async update(resumeId: string, style: any) {
    const token = await this.auth.getIdTokenAsync(); // ✅
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.baseUrl}/${resumeId}`, { style }, { headers });
  }

  async create(resumeId: string, style: any) {
    const headers = await this.getHeaders();
    return this.http.post<any>(this.baseUrl, { resumeId, style }, { headers });
  }
}

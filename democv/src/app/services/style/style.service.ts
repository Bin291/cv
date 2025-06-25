import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {StyleSettingsModel} from '../../models/style-setting.model';
import {style} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private readonly baseUrl = 'http://localhost:3000/style-settings';

  constructor(private http: HttpClient, private auth: AuthService) {}
// ===============================font=================================================
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

  // ===========================================job===============================================
  private sizeSubject = new BehaviorSubject<string>('M');
  private positionSubject = new BehaviorSubject<string>('Below');
  private fontStyleSubject = new BehaviorSubject<string>('Normal');

  size$ = this.sizeSubject.asObservable();
  position$ = this.positionSubject.asObservable();
  fontStyle$ = this.fontStyleSubject.asObservable();

  updateSize(value: string) {
    this.sizeSubject.next(value);
  }

  updatePosition(value: string) {
    this.positionSubject.next(value);
  }

  updateFontStyle(value: string) {
    this.fontStyleSubject.next(value);
  }
 // ======================================================spacesing========================================
  // =========================================== spacing ==========================================
  private fontSizeSubject = new BehaviorSubject<number>(12);       // pt
  private lineHeightSubject = new BehaviorSubject<number>(1.5);    // unitless
  private marginXSubject = new BehaviorSubject<number>(12);        // mm
  private marginYSubject = new BehaviorSubject<number>(20);        // mm
  private spacingBetweenSubject = new BehaviorSubject<number>(16); // px

  fontSize$ = this.fontSizeSubject.asObservable();
  lineHeight$ = this.lineHeightSubject.asObservable();
  marginX$ = this.marginXSubject.asObservable();
  marginY$ = this.marginYSubject.asObservable();
  spacingBetween$ = this.spacingBetweenSubject.asObservable();

  updateFontSize(value: number) {
    this.fontSizeSubject.next(value);
  }

  updateLineHeight(value: number) {
    this.lineHeightSubject.next(value);
  }

  updateMarginX(value: number) {
    this.marginXSubject.next(value);
  }

  updateMarginY(value: number) {
    this.marginYSubject.next(value);
  }

  updateSpacingBetween(value: number) {
    this.spacingBetweenSubject.next(value);
  }

}

import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AddContentModel} from '../../models/add-content.model';

@Injectable({
  providedIn: 'root'
})
export class AddContentService {
  private apiUrl = `${environment.apiUrl}add-content`;
  private selectedContentSubject = new BehaviorSubject<string | null>(null);
  selectedContent$ = this.selectedContentSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<AddContentModel[]> {
    return this.http.get<AddContentModel[]>(this.apiUrl);
  }
  selectContent(content: string) {
    this.selectedContentSubject.next(content);
  }

  getById(id: number): Observable<AddContentModel> {
    return this.http.get<AddContentModel>(`${this.apiUrl}/${id}`);
  }
  private savedContents: { content: string; data: any }[] = [];

  // Lưu hoặc cập nhật dữ liệu cho content đã chọn
  saveContent(contentName: string, data: any) {
    const found = this.savedContents.find(c => c.content === contentName);
    if (found) {
      // So sánh xem đã tồn tại chưa (nội dung y chang)
      const isDuplicate = found.data.some((d: any) => JSON.stringify(d) === JSON.stringify(data));

      if (!isDuplicate) {
        found.data.push(data);
      }
    } else {
      this.savedContents.push({ content: contentName, data: [data] });
    }
  }



  getSavedContents(): { content: string; data: any }[] {
    return [...this.savedContents];
  }

  removeContent(contentName: string) {
    this.savedContents = this.savedContents.filter(c => c.content !== contentName);
  }

  clearAll() {
    this.savedContents = [];
  }
}


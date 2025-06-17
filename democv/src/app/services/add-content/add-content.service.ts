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
}


import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddContentModel} from '../../models/add-content.model';

@Injectable({
  providedIn: 'root'
})
export class AddContentService {
  private apiUrl = `${environment.apiUrl}add-content`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AddContentModel[]> {
    return this.http.get<AddContentModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<AddContentModel> {
    return this.http.get<AddContentModel>(`${this.apiUrl}/${id}`);
  }
}


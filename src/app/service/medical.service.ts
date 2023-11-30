import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {
  private readonly url: string = environment.path;
  private readonly medical: string = 'api/external/';

  constructor(private http: HttpClient) {}

  getMedicalHistory(param: any): Observable<any> {
    return this.http.post<any>(`${this.url}${this.medical}getMedicalHistory`, param);
  }
}

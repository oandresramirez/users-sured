import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { userP } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class RunServeService {



  constructor(private http: HttpClient) {
  }


  getData(param: string): Observable<any> {
    const service = environment.get_host + param;
    return this.http.get(service).pipe(map(response => response));
  }

  postData(param: string, data: userP): Observable<any> {
    const service = environment.get_host + param;
    return this.http.post(service, data).pipe(map(response => response));
  }

  putData(param: string, data: userP): Observable<any> {
    const service = environment.get_host + param;
    return this.http.put(service, data).pipe(map(response => response));
  }

  deleteData(param: string): Observable<any> {
    const service = environment.get_host + param;
    return this.http.delete(service).pipe(map(response => response));
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export class System {
  systemName: string;
  systemType: string;
  systemCredentials: string;
  systemLocation: string;
}
export class Response {
  _id?: boolean;
  deletedCount?: number;
  nModified?: number;
}
const { backend : { url } } = environment

@Injectable({
  providedIn: 'root'
})

export class SystemsService {

  constructor(private http: HttpClient) { }

  addSystem(system: System): Observable<Response>{
    console.log(system)
    const options = new HttpParams()
    .set('label', system.systemName)
    .set('type', system.systemType)
    .set('credentials', system.systemCredentials)
    .set('location', system.systemLocation)
    return this.http.post<Response>(`${url}/provider`, options)
  }
  
  getSystems(): Observable<[]>{
    return this.http.get<[]>(`${url}/provider`)
  }
 
  updateSystem(id: string, system: System): Observable<Response>{
    console.log(system)
    const options = new HttpParams()
    .set('label', system.systemName)
    .set('type', system.systemType)
    .set('credentials', system.systemCredentials)
    .set('location', system.systemLocation)
    return this.http.put<Response>(`${url}/provider/${id}`, options)
  }

  deleteSystem(id: string):Observable<Response>{
    return this.http.delete<Response>(`${url}/provider/${id}`)
  }
  
}

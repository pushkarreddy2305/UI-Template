import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Project {
  details: {
    projectName: string,
    projectDescription: string,
    title: string,
    projectKey: string,
    pageContent: string,
  };
  templateName?: string;
  _id?: string;
}

export class Response {
  // _id: string;
  id?: string;
  success?: boolean;
  deletedCount?: number;
}

const { backend : { url } } = environment

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  getProjects = () =>{
    return this.http.get(`${url}/project`)
  }
  createProject = (project: Project):Observable<Response> =>{
    const { details } = project;
    let options = new HttpParams().set('name', details.projectName)
                                  .set('description', details.projectDescription)
                                  .set('key', details.projectKey)
                                  .set('pageContent', details.pageContent)
                                  .set('template', project.templateName)
    return this.http.post<Response>(`${url}/project`,  options )
  }
  updateProject = (project: Project):Observable<Response> => {
    let options = new HttpParams().set('name', project.details.projectName)
                                  .set('description', project.details.projectDescription)
                                  .set('id', project._id)
    return this.http.put<Response>(`${url}/project`,  options )
  }
  deleteProject = (id: string): Observable<Response> => {
    // let options = new HttpParams().set('id', id)
    return this.http.delete<Response>(`${url}/project/${id}`)
  }
}

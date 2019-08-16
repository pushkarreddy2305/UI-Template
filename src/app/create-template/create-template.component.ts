import { Component, OnInit } from '@angular/core';
import { ITemplates } from './entity/template.entity';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent {

  data = new ITemplates();
  constructor(private router: Router,
    private http: HttpClient, ) { }


  createTemplate(data) {
    console.log(data);

    this.http.post(environment.backend.url + "/template", data)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl('viewtemplates').then(nav => {
            console.log(nav);
          }, err => {
            console.log(err);
          });
        })



  }

}

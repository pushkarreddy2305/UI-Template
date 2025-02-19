import { Component, OnInit } from '@angular/core';
import { DataEntity } from './../shared/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-edittemplate',
  templateUrl: './edittemplate.component.html',
  styleUrls: ['./edittemplate.component.scss']
})
export class EdittemplateComponent {

  data: any;
  templateType: any;

  constructor(
    private service: DataEntity,
    private http: HttpClient,
    private router: Router
  ) {

    this.data = service.getEntityData();
    console.log(this.data);
    this.getTemplateType(this.data.templateType);

  }


  getTemplateType(id) {
    console.log(id);
    this.http.get(environment.backend.url + "/template/templatetype/" + id)
      .subscribe(
        (res) => {
          this.templateType = res;
          console.log(this.templateType);
        })
  }

  updateTemplate(data) {

    console.log(data);
    var obj = {
      "name": data.templateName,
      "location": data.templateLocation,
      "type": this.templateType.typeName
    }
    console.log(obj);
    this.http.put(environment.backend.url + "/template/" + data._id, obj)
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

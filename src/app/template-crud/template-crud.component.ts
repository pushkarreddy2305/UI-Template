import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { DataEntity } from './../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-crud',
  templateUrl: './template-crud.component.html',
  styleUrls: ['./template-crud.component.scss']
})
export class TemplateCrudComponent {

data: any;

  constructor(private http: HttpClient,
    private router: Router,
    private service:DataEntity) {

     this.http.get(environment.backend.url + "/template")
    .subscribe(
      (res)=>{
          console.log(res);
          this.data = res;
          console.log(this.data);
      })

   }


   create(){

    this.router.navigateByUrl('createtemplate').then(nav => {
      console.log(nav);
    }, err => {
      console.log(err);
    });

   }

   edit(data){
     console.log("in");
    console.log(data);
    this.service.setEntityData(data);
    this.router.navigateByUrl('edittemplate').then(nav => {
      console.log(nav);
    }, err => {
      console.log(err);
    });
   }


   delete(data){

    console.log(data);
    this.http.delete(environment.backend.url + "/template/" + data._id)
    .subscribe(
      (res)=>{
          console.log(res);
          this.data = res;
          console.log(this.data);
          window.location.reload();
      })

   }

}

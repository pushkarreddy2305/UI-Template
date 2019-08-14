import { Component, OnInit } from '@angular/core';
import { DataEntity } from './../shared/data.service';

@Component({
  selector: 'app-edittemplate',
  templateUrl: './edittemplate.component.html',
  styleUrls: ['./edittemplate.component.scss']
})
export class EdittemplateComponent  {

  data:any;

  constructor(
    private service:DataEntity
  ) { 

   this.data = service.getEntityData();
   console.log(this.data);

  }

  updateTemplate(data){

    console.log(data);

  }
}

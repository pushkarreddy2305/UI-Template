import { Component, OnInit } from '@angular/core';
import { ITemplates } from './entity/template.entity';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.scss']
})
export class CreateTemplateComponent {

  data= new ITemplates();
  constructor() { }


  createTemplate(data){
    console.log(data);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ProjectService } from '../services/project.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  public selectedMenu = 'Select Template'
  constructor(private formBuilder: FormBuilder,
    public project: ProjectService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  projectForm = this.formBuilder.group({
    projectName: ['', Validators.required],
    projectDescription: ['', [Validators.required, Validators.maxLength(100)]],
    projectTitle: ['', [Validators.required, Validators.maxLength(100)]],
    projectKey: ['', [Validators.required, Validators.maxLength(100)]],
    pageContent: ['', [Validators.required, Validators.maxLength(100)]]
  });
  
  create(){
    let project = {
      details: this.projectForm.value,
      templateName: this.selectedMenu,
    }
    this.project.createProject(project)
    .subscribe(res=>{
      console.log(res)
      if (res.id) {
        this.router.navigate(['/project'])
        //set timeout to get back status
      } else {
        alert('there was an error creating the page')
      }
    })
  }

  cancel(){
    this.router.navigate(['/project'])
  }

  selectTemplate(templateName){
    this.selectedMenu = templateName
  }
}

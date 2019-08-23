import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})


export class ProjectComponent implements OnInit {
  @Input() nameToSearch : string;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private proj: ProjectService, private router: Router, private http: HttpClient) {}
  public projects;
  public openEditor = "";

  projectsdata : {};

  updateForm = this.formBuilder.group({
    projectName: ['', Validators.required],
    projectDescription: ['', [Validators.required, Validators.maxLength(100)]]
  });

  ngOnInit() {
     this.getProjects()
  }
  openDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {name, id, deleteProject: this.deleteProject.bind(this)}
    });
  }

  getProjects(){
    this.http.get(environment.backend.url + "/project")
    .subscribe(res => {
      this.projectsdata = res;
      console.log(this.projectsdata);
    });
  }

  delete(projectdata){
    console.log(projectdata);
    this.http.delete(environment.backend.url + "/project/" + projectdata._id)
    .subscribe(res => {
     console.log(res);
     window.location.reload();
    });
  }


  getSpaceUrl(base:string, endpoint:string){
    return base + endpoint;
  }
  cancelUpdate(){
    this.openEditor= ""
  }
  createProj(){
    this.router.navigate(['/project/create'])
  }

  updateProj(id: string){
    console.log(id, this.updateForm.value)
    this.proj.updateProject({ _id: id, details: this.updateForm.value })
    .subscribe(res=> {
      console.log(res)
      if (res.success === true) {
        this.openEditor = null;
        this.ngOnInit()
      }
    })
  }

  deleteProject(id: string){
    this.proj.deleteProject(id)
    .subscribe(res=> {
      if(res.deletedCount >= 1) {
        this.ngOnInit()
      }
    })
  }

  

  editProject(id: string){
    this.openEditor = id;
    }
  }

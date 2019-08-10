import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SystemsService } from '../services/systems.service'
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.css'],
})
export class SystemsComponent implements OnInit {
  public systems = [
    {
      label: 'System1',
      _id: '001',
      type: 'github',
      credentials: '123',
      location: 'http://www.google.com'
    }
  ];
  public openEditor = "";

  constructor(public dialog: MatDialog, private system: SystemsService, private formBuilder: FormBuilder, private router: Router) { }

  updateForm = this.formBuilder.group({
    systemName: ['', Validators.required],
    systemCredentials: ['', [Validators.required, Validators.maxLength(100)]],
    systemType: ['', [Validators.required, Validators.maxLength(100)]],
    systemLocation: ['', [Validators.required, Validators.maxLength(100)]]
  });

  ngOnInit() {
    this.system.getSystems()
    .subscribe(res=>{
      console.log(res)
      if(res.length) {
        this.systems = res
      }
    })
  }

  editSystem(id: string){
    this.openEditor = id
  }

  addProvider(){
    this.router.navigate(['systems/create'])
  }
  cancelUpdate(){
    this.openEditor = '';
  }
  updateSystem(id: string){
    console.log(this.updateForm.value)
    this.system.updateSystem(id, this.updateForm.value)
    .subscribe(res=>{
      if(res._id) {
        this.openEditor = '';
        this.ngOnInit()
      } else {
        alert('could not update')
      }
    })
  }

  openDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {name, id, deleteProject: this.deleteSystem.bind(this)}
    });
  }

  deleteSystem(id: string){
    this.system.deleteSystem(id)
    .subscribe(res => {
      if(res.deletedCount >=1) {
        this.ngOnInit()
      } else {
        alert('could not delete')
      }
    })
  }

}

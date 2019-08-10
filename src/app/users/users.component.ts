import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';
import { resolveSoa } from 'dns';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  @Input() nameToSearch : string;
  public userList;
  public availableRoles = {
    'Admin' : true,
    'Manager' : true,
    'Team' : true,
  };
  public roles = Object.keys(this.availableRoles)

  constructor(private dialog: MatDialog, private users: UsersService){}
 ngOnInit() {
    this.users.getAllUsers()
    .subscribe(res=> {
      console.log(res);
      this.userList = res
    })
  }
 checkedRoles(){
  return this.roles.filter((role: string)=> {
    return this.availableRoles[role] === true
  })
}
  detectEvent(e){
    console.log(e)
  }
  containsRole (userRoles: []){
    let selected = this.checkedRoles()
    return userRoles.some((userRole) =>{
      return selected.indexOf(userRole) >=0
    })
  }


  setFilter(event :boolean, role: string){
    console.log(event, role)
    this.availableRoles[role] = event;
    console.log(this.availableRoles)
  }

  // openDialog(id: string, name: string): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data: {name, id, addRole: this.updateRole.bind(this), removeRole: this.removeRole.bind(this)}
  //   });
  // }

  // updateRole(){

  // }

  // removeRole(){

  // }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ParserService, ajv } from '../services/parser.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadingComponent } from './loading/loading.component';
import { Promise } from 'bluebird';
// import { Promise } from '../../../node_modules/@types/q';

const {
  backend: {
    url: backendUrl
  }
} = environment;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  private _selectedFile: File = null;
  status = new BehaviorSubject<{ message?: string, status?: string | boolean }>(null);

  set selectedFile( file: File ) {
    this.status.next({ status: false });
    this._selectedFile = file;
  }

  get selectedFile(): File {
    return this._selectedFile;
  }


  constructor(private router: Router, private httpClient: HttpClient, private fileParser: ParserService, private dialog: MatDialog) {}

  stopEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onDrop(evt) {
    this.stopEvent(evt);
    const [ file ]  = evt.dataTransfer.files;
    if (file) {
      this.selectedFile = file;
    }
  }

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  upload() {
    const dialogRef: MatDialogRef<LoadingComponent> = this.dialog.open(LoadingComponent, {
      height: '400px',
      width: '600px',
      disableClose: true,
      data: {
        status: this.status
      }
    });
    this.status.next({status: 'pending'});
    this.fileParser.parse(this.selectedFile)
    .then((json = []) => {
      const headers = new HttpHeaders({
        'content-Type': 'application/json',
      });
      const delayPost  = (url,body) => {
        return Promise.delay(2000).then(() => this.httpClient.post(url,body,{headers}).toPromise())
      }
      const sanitize = ({memberID, member, order, earn, rowNumber}) => {
        const rejectPromise = (type) => Promise.reject({rowNumber, type});
        const uploadMember = () => {
          if ( member && ajv.validate('member', member)) {
            return delayPost(`${backendUrl}/members`,  Object.assign({memberID}, member));
          }
         return (member ? rejectPromise('member') : Promise.resolve({}));
        };
        const uploadRest = () => {
          const postOrder = () => {
            if (order){
              return ajv.validate('order', order)
                ? delayPost(`${backendUrl}/orders`, Object.assign({memberID}, order))
                : rejectPromise('order');
            }
            return Promise.resolve({});
          };
          const postEarn = () => {
            if (earn){
              return ajv.validate('earn', earn)
                ? delayPost(`${backendUrl}/earn`, Object.assign({memberID}, earn))
                : rejectPromise('earn');
            }
            return Promise.resolve({});
          };

          return postEarn().then(postOrder);
        };
        const pending = member ? uploadMember() : uploadRest();

        return pending.then(() => {
          return member && uploadRest();
        }).catch((err) => {
          return Promise.reject({displayError: rowNumber, err});
        });
      };
      // return sanitize(json);
      return json.reduce((agg, value) => {
        return agg.then(() => sanitize(value));
      }, Promise.resolve());
    }, () => Promise.reject('Unable to read file.'))
    .then((transactions) => {
      dialogRef.disableClose = false;
      const showPlural = Array.isArray(transactions) && transactions.length > 1;
      this.status.next({
        message: `${showPlural ? transactions.length : '' } Transaction${ showPlural ? 's' : ''}`
        , status: 'done' });
    })
    .catch((err = {}) => {
      dialogRef.close();
      console.log(err);
      if (err.displayError != undefined) {
        const { err:{error:{ error="" } = {} } = {} } = err
        this.status.next({ message: `Unable To Complete Transactions: Error on line ${err.displayError}${error ? '; '+ error : ""}` , status: 'error'});
      } else {
      this.status.next({ message: `Unable To Complete Transactions: ${err}` , status: 'error'}); }
    });
  }
}

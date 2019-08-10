import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface SavedLink {
  name: string;
}

export class ProfileBase {
  protected saved?: SavedLink[] = [];
  private _id?: string;
  private _rev?: string;

  private get id() {
    return this._id;
  }
  private set id(id: string) {
    this._id = id;
  }

  private get rev() {
    return this._rev;
  }
  private set rev(rev: string) {
    this._rev = rev;
  }

  constructor(profile?: ProfileBase) {
    if (profile) {
      const { saved = [], _id, _rev, id, rev } = profile;
      Object.assign(this, { saved, _id, _rev, id, rev });
    }
  }
}

export class Profile extends ProfileBase {
  savedLinks: BehaviorSubject<SavedLink[]> = new BehaviorSubject([]);

  constructor(profile?: Profile) {
    super(profile);
    this.update(profile);
  }

  protected getProfile(): ProfileBase {
    return new ProfileBase(this);
  }

  protected saveLink(savedLink: SavedLink): ProfileBase | Promise<ProfileBase> {
    this.saved.push(savedLink);
    return this.getProfile();
  }
  protected deleteLink(savedLink: SavedLink): ProfileBase | Promise<ProfileBase> {
    const index = this.saved.indexOf(savedLink);
    if (index !== -1) {
      this.saved.splice(index, 1);
    }
    return this.getProfile();
  }
  update = (profile: Profile) => {
    Object.assign(this, profile);
    this.savedLinks.next(this.saved);
  }

}

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends Profile {
  private _profile;
  pending = this.http.get('/profile');
  constructor(private http: HttpClient) {
    super();
    this.pending.toPromise().then(this.update);
  }

  saveLink = (savedLink: SavedLink): ProfileBase | Promise<ProfileBase> => {
    return this.http.put('/profile', super.saveLink(savedLink))
      .toPromise().then(this.update).then(this.getProfile);
  }

  deleteLink = (savedLink: SavedLink): ProfileBase | Promise<ProfileBase> => {
    return this.http.put('/profile', super.deleteLink(savedLink))
      .toPromise().then(this.update).then(this.getProfile);
  }
}

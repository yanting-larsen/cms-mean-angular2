import { Injectable } from '@angular/core';
import { Settings } from './settings';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {
  private settingsUrl = 'http://localhost:8080/api/settings';

  constructor (private http: Http) { }

  // get("/api/settings")
  getSettings(): Promise<Settings> {
    return this.http.get(this.settingsUrl)
               .toPromise()
               .then(response => response.json() as Settings)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}

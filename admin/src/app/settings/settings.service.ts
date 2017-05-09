import { Injectable } from '@angular/core';
import { Settings } from './settings';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../auth.service';

@Injectable()
export class SettingsService {
  private settingsUrl = 'http://localhost:8080/api/settings';

  constructor (
    private http: Http,
    private authService: AuthService) {}

  requestOpts(): RequestOptions {
    // Add authorization header with JWT token
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    const options = new RequestOptions({ headers: headers });

    return options;
  }

  // get("/api/settings")
  getSettings(): Promise<Settings> {
    return this.http.get(this.settingsUrl, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Settings)
               .catch(this.handleError);
  }

  // put("/api/settings")
  updateSetings(putSettings: Settings): Promise<Settings> {
    return this.http.put(this.settingsUrl, putSettings, this.requestOpts)
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

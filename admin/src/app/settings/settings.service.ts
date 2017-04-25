import { Injectable } from '@angular/core';
import { Settings } from './settings';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SettingsService {
  private settingsUrl = 'http://localhost:9000/api/settings';

  private headers = new Headers({
    'Access-Control-Allow-Origin': '*'
  });

  constructor (private http: Http) {}

  // get("/api/settings")
  getSettings(): Promise<Settings[]> {
    return this.http.get(this.settingsUrl, this.headers)
               .toPromise()
               .then(response => response.json() as Settings[])
               .catch(this.handleError);
  }

  // put("/api/settings/:id")
  updateSetings(putSettings: Settings): Promise<Settings> {
    const putUrl = this.settingsUrl + '/' + putSettings._id;
    return this.http.put(putUrl, putSettings, this.headers)
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

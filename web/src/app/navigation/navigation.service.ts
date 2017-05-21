import { Injectable } from '@angular/core';
import { Page } from '../page';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NavigationService {
  private navigationUrl = 'http://localhost:8080/api/navigation';

  constructor(
    private http: Http) {}

  // get("/api/navigation")
  getNavigation(): Promise<Page[]> {
    return this.http.get(this.navigationUrl)
               .toPromise()
               .then(response => response.json() as Page[])
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(errMsg);
  }
}

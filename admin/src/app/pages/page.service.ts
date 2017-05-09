import { Injectable } from '@angular/core';
import { Page } from './page';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../auth.service';

@Injectable()
export class PageService {
  private pagesUrl = 'http://localhost:8080/api/pages';

  constructor (
    private http: Http,
    private authService: AuthService) {}

  requestOpts(): RequestOptions {
    // Add authorization header with JWT token
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    const options = new RequestOptions({ headers: headers });

    return options;
  }

  // get("/api/pages")
  getPages(): Promise<Page[]> {
    return this.http.get(this.pagesUrl, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Page[])
               .catch(this.handleError);
  }

  // post("/api/pages")
  createPage(newPage: Page): Promise<Page> {
    return this.http.post(this.pagesUrl, newPage, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Page)
               .catch(this.handleError);
  }

  // get("/api/pages/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deletePage(delPageId: String): Promise<String> {
    return this.http.delete(this.pagesUrl + '/' + delPageId, this.requestOpts())
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/pages/:id")
  updatePage(putPage: Page): Promise<Page> {
    const putUrl = this.pagesUrl + '/' + putPage._id;
    return this.http.put(putUrl, putPage, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Page)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}

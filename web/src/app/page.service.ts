import { Injectable } from '@angular/core';
import { Page } from './page';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  private pagesUrl = 'http://localhost:8080/api/pages';

  constructor(
    private http: Http) {}

  // get("/api/pages")
  getPages(): Promise<Page[]> {
    return this.http.get(this.pagesUrl)
               .toPromise()
               .then(response => response.json() as Page[])
               .catch(this.handleError);
  }

  // get("/api/pages/:id")
  getPage(getPageId: String): Promise<Page> {
    const getUrl = this.pagesUrl + '/' + getPageId;
    return this.http.get(getUrl)
               .toPromise()
               .then(response => response.json() as Page)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    console.error(errMsg);
  }
}

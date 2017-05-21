import { Injectable } from '@angular/core';
import { Page } from './page';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  private pagesUrl = 'http://localhost:8080/api/pages';

  constructor(
    private http: Http) {}

  // get("/api/pages/navigation")
  getNavigation(): Promise<Page[]> {
    return this.http.get(this.pagesUrl + '/navigation')
               .toPromise()
               .then(response => response.json() as Page[])
               .catch(this.handleError);
  }

  // get("/api/pages/show?slug=...")
  getPage(slug: String): Promise<Page> {
    const getUrl = this.pagesUrl + '/show?slug=' + slug;
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

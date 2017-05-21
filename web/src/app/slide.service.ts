import { Injectable } from '@angular/core';
import { Slide } from './slide';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SlideService {
  private slideUrl = 'http://localhost:8080/api/slides';

  constructor(
    private http: Http) {}

  // get("/api/slides")
  getSlides(): Promise<Slide[]> {
    return this.http.get(this.slideUrl)
               .toPromise()
               .then(response => response.json() as Slide[])
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}

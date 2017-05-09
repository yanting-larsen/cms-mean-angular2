import { Injectable } from '@angular/core';
import { Slide } from './slide';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../auth.service';

@Injectable()
export class SlideService {
  private slideUrl = 'http://localhost:8080/api/slides';

  constructor(
    private http: Http,
    private authService: AuthService) {}

  requestOpts(): RequestOptions {
    // Add authorization header with JWT token
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
    const options = new RequestOptions({ headers: headers });

    return options;
  }

  // get("/api/slides")
  getSlides(): Promise<Slide[]> {
    return this.http.get(this.slideUrl, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Slide[])
               .catch(this.handleError);
  }

  // post("/api/slides")
  createSlide(newSlide: Slide): Promise<Slide> {
    return this.http.post(this.slideUrl, newSlide, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Slide)
               .catch(this.handleError);
  }

  // delete("/api/slides/:id")
  deleteSlide(delSlideId: String): Promise<String> {
    return this.http.delete(this.slideUrl + '/' + delSlideId, this.requestOpts())
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/slides/:id")
  updateSlide(putSlide: Slide): Promise<Slide> {
    const putUrl = this.slideUrl + '/' + putSlide._id;
    return this.http.put(putUrl, putSlide, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Slide)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}

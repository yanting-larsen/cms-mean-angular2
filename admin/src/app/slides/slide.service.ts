import { Injectable } from '@angular/core';
import { Slide } from './slide';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SlideService {
  private slideUrl = 'http://localhost:9000/api/slides';

  private headers = new Headers({
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: Http) {}

  // get("/api/slides")
  getSlides(): Promise<Slide[]> {
    return this.http.get(this.slideUrl, this.headers)
               .toPromise()
               .then(response => response.json() as Slide[])
               .catch(this.handleError);
  }

  // post("/api/slides")
  createSlide(newSlide: Slide): Promise<Slide> {
    return this.http.post(this.slideUrl, newSlide, this.headers)
               .toPromise()
               .then(response => response.json() as Slide)
               .catch(this.handleError);
  }

  // delete("/api/slides/:id")
  deleteSlide(delSlideId: String): Promise<String> {
    return this.http.delete(this.slideUrl + '/' + delSlideId, this.headers)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/slides/:id")
  updateSlide(putSlide: Slide): Promise<Slide> {
    const putUrl = this.slideUrl + '/' + putSlide._id;
    return this.http.put(putUrl, putSlide, this.headers)
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

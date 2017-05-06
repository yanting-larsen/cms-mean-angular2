import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AuthService } from '../auth.service';

@Injectable()
export class AdminService {
  private adminsUrl = 'http://localhost:8080/api/admins';

  constructor (
    private http: Http,
    private authService: AuthService) {}

  requestOpts(): RequestOptions {
    // Add authorization header with JWT token
    const headers = new Headers({ 'Authorization': this.authService.token });
    const options = new RequestOptions({ headers: headers });

    return options;
  }

  // get("/api/admins")
  getAdmins(): Promise<Admin[]> {
    return this.http.get(this.adminsUrl, this.requestOpts())
                .toPromise()
                .then(response => response.json() as Admin[])
                .catch(this.handleError);
  }

  // post("/api/pages")
  createAdmin(newAdmin: Admin): Promise<Admin> {
    return this.http.post(this.adminsUrl, newAdmin, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Admin)
               .catch(this.handleError);
  }

  // delete("/api/admins/:id")
  deleteAdmin(delAdminId: String): Promise<String> {
    return this.http.delete(this.adminsUrl + '/' + delAdminId, this.requestOpts())
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/admins/:id")
  updateAdmin(putAdmin: Admin): Promise<Admin> {
    const putUrl = this.adminsUrl + '/' + putAdmin._id;
    return this.http.put(putUrl, putAdmin, this.requestOpts())
               .toPromise()
               .then(response => response.json() as Admin)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}

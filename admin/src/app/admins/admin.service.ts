import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdminService {
  private adminsUrl = 'http://localhost:9000/api/admins';

  private headers = new Headers({
    'Access-Control-Allow-Origin': '*'
  });

  constructor (private http: Http) {}

  // get("/api/admins")
  getAdmins(): Promise<Admin[]> {
    return this.http.get(this.adminsUrl, this.headers)
                .toPromise()
                .then(response => response.json() as Admin[])
                .catch(this.handleError);
  }

  // post("/api/pages")
  createAdmin(newAdmin: Admin): Promise<Admin> {
    return this.http.post(this.adminsUrl, newAdmin, this.headers)
               .toPromise()
               .then(response => response.json() as Admin)
               .catch(this.handleError);
  }

  // delete("/api/admins/:id")
  deleteAdmin(delAdminId: String): Promise<String> {
    return this.http.delete(this.adminsUrl + '/' + delAdminId, this.headers)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/admins/:id")
  updateAdmin(putAdmin: Admin): Promise<Admin> {
    const putUrl = this.adminsUrl + '/' + putAdmin._id;
    return this.http.put(putUrl, putAdmin, this.headers)
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

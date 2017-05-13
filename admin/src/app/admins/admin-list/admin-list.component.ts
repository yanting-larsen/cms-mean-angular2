import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { AdminDetailsComponent } from '../admin-details/admin-details.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [AdminService]
})
export class AdminListComponent implements OnInit {

  admins: Admin[];
  selectedAdmin: Admin;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService
      .getAdmins()
      .then((admins: Admin[]) => {
        this.admins = admins;
      });
  }

  private getIndexOfAdmin = (adminId: String) => {
    return this.admins.findIndex((admin) => {
      return admin._id === adminId;
    });
  }

  selectAdmin(admin: Admin) {
    this.selectedAdmin = admin;
  }

  createNewAdmin() {
    const admin: Admin = {
      userName: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      lastLoginTime: 0
    };

    this.selectAdmin(admin);
  }

   deleteAdmin = (adminId: String) => {
     console.log(adminId);
     const idx = this.getIndexOfAdmin(adminId);
     if (idx !== -1) {
       this.admins.splice(idx, 1);
       this.selectAdmin(null);
     }
     return this.admins;
   }

   addAdmin = (admin: Admin) => {
     this.admins.push(admin);
     this.selectAdmin(admin);
     return this.admins;
   }

   updateAdmin = (admin: Admin) => {
     const idx = this.getIndexOfAdmin(admin._id);
     if (idx !== -1) {
       this.admins[idx] = admin;
       this.selectAdmin(admin);
     }
     return this.admins;
   }
}

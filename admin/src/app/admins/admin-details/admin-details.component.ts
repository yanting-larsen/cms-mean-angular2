import { Component, Input, OnInit } from '@angular/core';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {
  admins: Admin[];

  @Input()
  admin: Admin;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private adminService: AdminService) {}

  createAdmin(admin: Admin) {
    this.adminService.createAdmin(admin).then((newAdmin: Admin) => {
      this.createHandler(newAdmin);
    });
  }

  updateAdmin(admin: Admin): void {
    this.adminService.updateAdmin(admin).then((updateAdmin: Admin) => {
      this.updateHandler(updateAdmin);
    });
  }

  deleteAdmin(adminId: String): void {
    this.adminService.deleteAdmin(adminId).then((deletedAdminId: String) => {
      this.deleteHandler(deletedAdminId);
    });
  }

  ngOnInit() {
    this.adminService
      .getAdmins()
      .then((admins: Admin[]) => {
        this.admins = admins;
      });
  }
}

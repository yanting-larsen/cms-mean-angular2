export class Admin {
  _id?: string;
  userName: string; // required, must be 5-8 characters
  fullName: string; // requried, must be 5-8 characters
  password: string; // requried, must be equal to confirm password.
  confirmPassword: string; // required, value must be equal to password.
  lastLoginTime: number;
}

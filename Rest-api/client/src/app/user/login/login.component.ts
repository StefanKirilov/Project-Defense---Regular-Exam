import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/validators/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router){}

  login(form: NgForm): void {
    if (form.invalid){
      return;
    }
    const value: {email: string , password: string } = form.value;
    
    this.userService.login(value.email, value.password).subscribe(() => {
      form.reset();
      this.router.navigate(['/']);
    });
  }

}

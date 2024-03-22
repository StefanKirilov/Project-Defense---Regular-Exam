import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router){}

  register(form: NgForm): void {
    if (form.invalid){
      return;
    }
    const value: {email: string , username: string, password: string, rePassword: string } = form.value;

    if (value.password != value.rePassword){
      throw Error(`Password and rePassword is not the same!`);
    }
    
    this.userService.register(value.email!, value.username!, value.password!, value.rePassword!).subscribe(() => {
      form.reset();
      this.router.navigate(['/']);
    });
  }

}

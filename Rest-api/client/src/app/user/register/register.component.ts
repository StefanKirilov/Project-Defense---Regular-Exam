import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/validators/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;
  unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router){}

  register(form: NgForm): void {
    if (form.invalid){
      return;
    }
    const value: {email: string , username: string, password: string, rePassword: string } = form.value;

    if (value.password != value.rePassword){
      throw Error(`Password and rePassword is not the same!`);
    }
    
    this.userService.register(value.email!, value.username!, value.password!, value.rePassword!).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      form.reset();
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }
  
}

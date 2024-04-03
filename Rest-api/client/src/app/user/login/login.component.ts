import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/validators/constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;
  unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService, private router: Router){}

  login(form: NgForm): void {
    if (form.invalid){
      return;
    }
    const value: {email: string , password: string } = form.value;
    
    this.userService.login(value.email, value.password).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      form.reset();
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }

}

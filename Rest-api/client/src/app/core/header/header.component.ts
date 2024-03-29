import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('checkElement') checkElement!: ElementRef<HTMLElement>

  constructor(private userService: UserService, private router: Router){}

  get isLoggedIn(): boolean{
    return this.userService.isLogged;
  }

  get userName(): string {
    return this.userService.user?.username || "";
  }

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    })
  }

  
}

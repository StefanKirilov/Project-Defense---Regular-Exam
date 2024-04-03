import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { USER_KEY, environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  public user: User | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  subscription: Subscription;
  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe(user => {
      this.user = user;
    })
  }

  register(email: string, username: string, password: string, rePassword: string) {

    return this.http
      .post<User>('/api/users/register', { email: email, username: username, password: password, rePassword: rePassword })
      .pipe(tap((user) => this.user$$.next(user)));
  };

  login(email: string, password: string) {

    return this.http
      .post<User>('/api/users/login', { email: email, password: password })
      .pipe(tap((user) => this.user$$.next(user)))
  };

  logout() {
    return this.http
      .post<User>('/api/users/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)))
  };

  getProfile() {
    return this.http.get<User>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)))
  }

  updateProfile(email: string, username: string) {
    return this.http.put<User>('/api/users/profile', { email, username })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

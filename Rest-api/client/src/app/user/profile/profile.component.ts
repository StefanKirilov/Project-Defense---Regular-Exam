import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from '../../shared/validators/app-email-validator';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/validators/constants';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
import { House } from '../../types/house';
import { Subject, takeUntil } from 'rxjs';

interface Profile {
  email: string;
  username: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditMode: boolean = false;
  userId: string | undefined;
  username: string | undefined;
  isAuth: boolean = false;
  myHouses: House[] = [];
  houseList: House[] = [];
  isLoading: boolean = true;
  haveItems: boolean = false;

  unsubscribe$ = new Subject<void>();

  profileDetails: Profile = {
    email: '',
    username: ''
  };

  form = this.fb.group({
    email: ["", [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    username: ["", [Validators.required]]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService) { 
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      this.userId = user?._id;
      this.username = user?.username;
      this.isAuth = !!this.userId;
    })
  }

  ngOnInit(): void {
    this.getAllHouses();

    const { email, username } = this.userService.user!;
    
    this.profileDetails = {
      email,
      username,
    };

    this.form.setValue({
      email,
      username,
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfileHandler(): void {
    if (this.form.invalid) {
      return;
    }
    this.profileDetails = { ...this.form.value } as Profile;
    const { email, username } = this.profileDetails;

    this.userService.updateProfile(email, username).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.toggleEditMode();
    });
  }

  cancelProfileHandler(): void {
    this.toggleEditMode();
  }

  getAllHouses(): void {
    this.apiService.getHouse().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (houses) => {
        this.houseList = houses;
        this.myHouses = this.houseList.filter(el => el.owner === this.userId)
        this.isLoading = false;     
        if (this.myHouses.length > 0) {
          this.haveItems= true;
        } 
      },
      error: (error) => {
        console.error(`Error: ${error}`);
      },
    })
  }
}

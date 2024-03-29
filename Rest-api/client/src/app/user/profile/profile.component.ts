import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { appEmailValidator } from '../../shared/validators/app-email-validator';
import { DEFAULT_EMAIL_DOMAINS } from '../../shared/validators/constants';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
import { House } from '../../types/house';

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
  userId: string = '';
  myHouses: House[] = [];
  houseList: House[] = [];
  isLoading: boolean = true;
  haveItems: boolean = false;

  profileDetails: Profile = {
    email: '',
    username: ''
  };

  form = this.fb.group({
    email: ["", [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    username: ["", [Validators.required]]
  })

  constructor(private fb: FormBuilder, private userService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllHouses();
    // this.getMyLikes();
    this.getMyHouses();

    const { email, username } = this.userService.user!;
    // console.log(this.userService.user!);
    
    this.profileDetails = {
      email,
      username,
    };

    this.form.setValue({
      email,
      username,
    })
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

    this.userService.updateProfile(email, username).subscribe(() => {
      this.toggleEditMode();
    });
  }

  cancelProfileHandler(): void {
    this.toggleEditMode();
  }

  getAllHouses(): void {
    this.apiService.getHouse().subscribe({
      next: (houses) => {
        this.houseList = houses;
      },
      error: (error) => {
        console.error(`Error: ${error}`);
      },
    })
  }

  // getMyLikes(): void {
  //   this.userService.getProfile().subscribe(profile => {
  //     this.myLikesId = profile.likedHouses;
  //     this.myLikes = this.houseList.filter(el => this.myLikesId.includes(el._id))
  //   })
  // }

  getMyHouses(): void {
    this.userService.getProfile().subscribe(profile => {     
      this.userId = profile._id;
      this.myHouses = this.houseList.filter(el => el.owner === this.userId)
      this.isLoading = false;     
      if (this.myHouses.length > 0) {
        this.haveItems= true;
      } 
    })
  }


}

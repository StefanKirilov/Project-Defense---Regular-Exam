import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
import { House } from '../../types/house';

@Component({
  selector: 'app-liked-houses',
  templateUrl: './liked-houses.component.html',
  styleUrl: './liked-houses.component.css'
})
export class LikedHousesComponent implements OnInit {

  myLikesId: string[] = [];
  myLikes: House[] = [];
  houseList: House[] = [];
  isLoading: boolean = true;
  haveItems: boolean = false;

  constructor(private userService: UserService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllHouses();
    this.getMyLikes();
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

  getMyLikes(): void {
    this.userService.getProfile().subscribe(profile => {
      this.myLikesId = profile.likedHouses;
      
      this.myLikes = this.houseList.filter(el => this.myLikesId.includes(el._id))
      this.isLoading = false;
      if (this.myLikes.length > 0) {
        this.haveItems= true;
      } 
    })
  }
}

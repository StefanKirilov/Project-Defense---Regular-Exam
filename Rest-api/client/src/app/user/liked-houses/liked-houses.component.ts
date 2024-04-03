import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ApiService } from '../../api.service';
import { House } from '../../types/house';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-liked-houses',
  templateUrl: './liked-houses.component.html',
  styleUrl: './liked-houses.component.css'
})
export class LikedHousesComponent implements OnInit, OnDestroy {

  userId: string | undefined;
  username: string | undefined;
  isAuth: boolean = false;
  myLikes: House[] = [];
  houseList: House[] = [];
  isLoading: boolean = true;
  haveItems: boolean = false;

  unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService, private apiService: ApiService) {
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      this.userId = user?._id;
      this.username = user?.username;
      this.isAuth = !!this.userId;
    })
   }

  ngOnInit(): void {
    this.getAllHouses();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }

  getAllHouses(): void {
    this.apiService.getHouse().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (houses) => {
        this.houseList = houses;
        this.getMyLikes();
      },
      error: (error) => {
        console.error(`Error: ${error}`);
      },
    })
  }

  getMyLikes(): void {
      this.houseList.forEach((list) => {
        if (list.likes.find(el => el === this.userId)) {
          this.myLikes.push(list)
        }
      })
      this.isLoading = false;
      if (this.myLikes.length > 0) {
        this.haveItems= true;
      }  
  }
}

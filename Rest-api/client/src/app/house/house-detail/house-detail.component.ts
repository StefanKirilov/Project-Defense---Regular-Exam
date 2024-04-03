import { Component, OnDestroy, OnInit } from '@angular/core';
import { House } from '../../types/house';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css',
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  house: House | undefined;
  isLiked: boolean = false;
  userId: string | undefined;
  username: string | undefined;
  isOwner: boolean = false;
  isAuth: boolean = false;
  isLoading: boolean = true;

  unsubscribe$ = new Subject<void>();

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
    this.userService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      this.userId = user?._id
      this.username = user?.username;
      this.isAuth = !!this.userId;
    })
  }

  ngOnInit(): void {
    this.fetchHouse();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }

  fetchHouse(): void {
    const id = this.activatedRoute.snapshot.params['houseId'];

    this.apiService.getHouseDetail(id).pipe(takeUntil(this.unsubscribe$)).subscribe(house => {
      this.house = house;
      
      if (this.house?.owner === this.userId || undefined) {
        this.isOwner = true;
      }

      if (this.house?.likes.some(uid => uid === this.userId)) {
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
      this.isLoading = false;
    })
  }

  deleteHouse(): void {
    const id = this.activatedRoute.snapshot.params['houseId'];
    this.apiService.deleteHouse(id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.router.navigate(['/houses'])
    });
  }

  like(): void {
    const id = this.activatedRoute.snapshot.params['houseId'];
    this.apiService.likeHouse(id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.fetchHouse();
    });
  }

  unlike(): void {
    const id = this.activatedRoute.snapshot.params['houseId'];
    this.apiService.unlikeHouse(id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.fetchHouse();
    });
  }

  addComment(form: NgForm): void {
    const id = this.activatedRoute.snapshot.params['houseId'];
    const { text } = form.value;


    this.apiService.postComment(id, text, this.username!).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      form.reset();
      this.fetchHouse();
    });
  }

  deleteComment(e: Event): void {
    const id = this.activatedRoute.snapshot.params['houseId'];

    const eventTarget: Element = e.target as Element;
    const elementId: string = eventTarget.id;

    this.apiService.deleteComment(id, elementId).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.fetchHouse();
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../../types/house';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrl: './house-edit.component.css'
})
export class HouseEditComponent implements OnInit, OnDestroy {
  house: House | undefined;
  unsubscribe$ = new Subject<void>();

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router){}

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
    });
  }

  updateHouse(form: NgForm): void {
    if(form.invalid){
      return;
    }
    let data: House = form.value;
    const id = this.activatedRoute.snapshot.params['houseId'];

    this.apiService.updateHouse(id, data).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.router.navigate([`/houses/${id}`]);
    });
  }
}

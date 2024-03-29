import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { House } from '../types/house';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  houseList: House[] = [];
  haveItems: boolean = false;

  private subscription!: Subscription;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.subscription = this.apiService.getHouse().subscribe({
      next: (houses) => {
        this.houseList = houses;
        this.isLoading = false;   
        if (this.houseList.length > 0) {
          this.haveItems= true;
        }  
      },
      error: (error) => {
        this.isLoading = false;
        console.error(`Error: ${error}`);       
      },
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { House } from '../types/house';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService){}

  isLoading: boolean = true;
  houseList: House[] = [];
  haveItems: boolean = false;

  ngOnInit(): void {
    this.apiService.getHouse().subscribe({
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
}

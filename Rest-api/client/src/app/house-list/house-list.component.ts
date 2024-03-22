import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { House } from '../types/house';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.css'
})
export class HouseListComponent implements OnInit {
  constructor(private apiService: ApiService){}

  isLoading: boolean = true;
  houseList: House[] = [];
  searchField: boolean = false;
  searching: string = '';
  filteredHouseList: House[] = [];
  haveItems: boolean = false;

  ngOnInit(): void {
    this.getHouse();
  }

  getHouse() {
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


  searchHouse(form: NgForm ): void {
    if (form.invalid) {
      return;
    }
    const { search } = form.value;   

    this.filterResults(search);
    form.reset(); 
    
  }

  filterResults(text: string) {  
    if (!text) {
      this.getHouse(); 
      this.searchField = false; 
      return;
    }
    this.filteredHouseList = this.houseList.filter(
      housingLocation => housingLocation?.location.toLowerCase().includes(text.toLowerCase())
    );
    this.houseList = this.filteredHouseList;  
    this.searchField = true; 
    this.searching = text;

  }
}

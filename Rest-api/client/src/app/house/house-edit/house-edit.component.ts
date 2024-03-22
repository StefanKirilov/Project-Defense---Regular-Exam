import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../../types/house';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrl: './house-edit.component.css'
})
export class HouseEditComponent implements OnInit {
  house: House | undefined;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.fetchHouse();
  }

  fetchHouse(): void {
    const id = this.activatedRoute.snapshot.params['houseId'];
    this.apiService.getHouseDetail(id).subscribe(house => {   
      this.house = house;
    });
  }

  updateHouse(form: NgForm): void {
    if(form.invalid){
      return;
    }

    let data: House = form.value;
    
    const id = this.activatedRoute.snapshot.params['houseId'];

    this.apiService.updateHouse(id, data).subscribe(() => {
      this.router.navigate([`/houses/${id}`]);
    });
  }
}

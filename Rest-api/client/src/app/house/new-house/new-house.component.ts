import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrl: './new-house.component.css'
})
export class NewHouseComponent {
  constructor(private apiService: ApiService, private router: Router){}

  newHouseSubmit(form: NgForm){

    if(form.invalid){
      return;
    }

    const {name, location,phone,description,price,image} = form.value;

    this.apiService.createHouse(name,location,phone,description,price,image).subscribe(() => {
      this.router.navigate(['/houses']);
    })
    
  }
}

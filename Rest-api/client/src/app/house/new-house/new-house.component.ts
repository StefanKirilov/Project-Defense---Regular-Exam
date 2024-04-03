import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrl: './new-house.component.css'
})
export class NewHouseComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(private apiService: ApiService, private router: Router){}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); 
  }

  newHouseSubmit(form: NgForm){
    if(form.invalid){
      return;
    }
    const {name, location,phone,description,price,image} = form.value;

    this.apiService.createHouse(name,location,phone,description,price,image).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.router.navigate(['/houses']);
    })  
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit, OnDestroy {
  apiError$ = this.errorService.apiError$$.asObservable();
  errorMsg = '';
  unsubscribe$ = new Subject<void>();

  constructor(private errorService: ErrorService){}

  ngOnInit() {
    this.apiError$.pipe(takeUntil(this.unsubscribe$)).subscribe((err: any) => {
      this.errorMsg = err.message;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();  
  }
}

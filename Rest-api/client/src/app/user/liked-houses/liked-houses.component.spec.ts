import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedHousesComponent } from './liked-houses.component';

describe('LikedHousesComponent', () => {
  let component: LikedHousesComponent;
  let fixture: ComponentFixture<LikedHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikedHousesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

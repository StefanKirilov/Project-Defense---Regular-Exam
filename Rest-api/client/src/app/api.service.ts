import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { House } from './types/house';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) { }

  getHouse() {
    // const { appUrl } = environment;
    return this.http.get<House[]>(`/api/bookings`);
  }

  getHouseDetail(id:string) {
    return this.http.get<House>(`/api/bookings/${id}`);
  }

  createHouse(name: string, location: string,phone: string,description: string,price: string,image: string) {
    return this.http.post<House>(`/api/bookings`, {name, location,phone,description,price,image});
  }

  updateHouse(id:string, data:House) {
    return this.http.put<House>(`/api/bookings/${id}`, data);
  }

  deleteHouse(id:string) {
    return this.http.delete<House>(`/api/bookings/${id}`);
  }

  likeHouse(id:string) {
    return this.http.get<House>(`/api/bookings/${id}/like`);
  }

  unlikeHouse(id:string) {
    return this.http.get<House>(`/api/bookings/${id}/unlike`);
  }

  postComment(id:string, comment: string, username:string) {   
    return this.http.post<House>(`/api/bookings/${id}/comments`, { comment, username });
  }

  deleteComment(id:string, elementId:string) {   
    return this.http.post<House>(`/api/bookings/${id}/likeComment`, {elementId});
  }
}

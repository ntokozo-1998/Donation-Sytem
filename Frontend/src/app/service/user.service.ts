import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  baseUrl : String = 'http://localhost:8080/api';
  fullname = localStorage.getItem('name')+' '+localStorage.getItem('surname')



  constructor(private http :HttpClient) { }

  createDonations(data: any) {
    return this.http.post(this.baseUrl+'/addDonations/'+localStorage.getItem('user_id'),data);
  }

  getDonation() {
    return this.http.get(this.baseUrl+'/getDonation');
  }

  getCompletedDonations(){
    return this.http.get(this.baseUrl+'/getCompleted/'+localStorage.getItem('user_id'))

  }

  getInProgressDonations(){
    return this.http.get(this.baseUrl+'/getInProgress/'+localStorage.getItem('user_id'))

  }

  deleteDonations(id:any,data:any)
  {
    return this.http.patch(this.baseUrl+'/deleteDonations/'+id,data);

  }

  updateDonations(postId:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/updateDonations/'+postId,form);

  }
 
  updateStatus(data:any)
  {
    return this.http.patch(this.baseUrl+'/updateStatus',data);

  }

  updateProfile(user_id:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/update/'+user_id,form);

  }

  getOneDonations(id:any)
  {
    return this.http.get(this.baseUrl+'/getOneDonations/'+id);
  }

  getOneUser(user_id:any)
  {
    return this.http.get(this.baseUrl+'/getOneUser/'+user_id);
  }

  getDonorDonations() {
    return this.http.get(this.baseUrl+'/getDonorPosts/'+localStorage.getItem('user_id'));
  }

  addDonations(data:any)
  {
    return this.http.post(this.baseUrl+'/addDonations/'+this.fullname,data);
  }










  
}

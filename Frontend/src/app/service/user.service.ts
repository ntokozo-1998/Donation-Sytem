import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : String = 'http://localhost:8080/api';
  fullname = sessionStorage.getItem('name')+' '+sessionStorage.getItem('surname')



  constructor(private http :HttpClient) { }

  createPost(data: any) {
    return this.http.post(this.baseUrl+'/addPost/'+sessionStorage.getItem('user_id'),data);
  }

  getPosts(): Observable<any> {
    return this.http.get(this.baseUrl+'/getPosts');
  }

  getPostStatus(post_id:any)
  {
    return this.http.get(this.baseUrl+'/getStatus/'+post_id);
  }

  getCompletedPosts(){
    return this.http.get(this.baseUrl+'/getCompleted/'+sessionStorage.getItem('user_id'))

  }

  getInProgressPosts(){
    return this.http.get(this.baseUrl+'/getInProgress/'+sessionStorage.getItem('user_id'))

  }

  getBids() {
    return this.http.get(this.baseUrl+'/getBids/'+sessionStorage.getItem('user_id'));
  }

  declineBid(id:any,data:any) {
    return this.http.patch(this.baseUrl+'/decline/' + id, data);

  }
  
  acceptBid(post_id:any,data:any){
    return this.http.patch(this.baseUrl+'/accept/' + post_id, data);
  }

  getClientPosts() {
    return this.http.get(this.baseUrl+'/getClientPosts/'+sessionStorage.getItem('user_id'));
  }

  deletePost(id:any,data:any)
  {
    return this.http.patch(this.baseUrl+'/deletePost/'+id,data);

  }

  updatePost(postId:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/updatePost/'+postId,form);

  }
 

  updateStatus(data:any)
  {
    return this.http.patch(this.baseUrl+'/updateStatus',data);

  }

  rateDeveloper(data:any)
  {
    return this.http.patch(this.baseUrl+'/rateDeveloper',data);
  }

  updateProfile(user_id:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/update/'+user_id,form);

  }

  updateProfilePicture(user_id:any,link:any)
  {
    return this.http.patch(this.baseUrl+'/updateProfilePicture/'+user_id, link);

  }

  sendReport(data:any,dev_id:any,client_id:any,post_id:any)
  {
    // console.log(data)
    return this.http.post(this.baseUrl+'/sendReport/'+dev_id+'/'+client_id+'/'+post_id,data);


  }

  getOnePost(id:any)
  {
    return this.http.get(this.baseUrl+'/getOnePost/'+id);
  }

  addBid(data:any)
  {
    return this.http.post(this.baseUrl+'/addBid/'+this.fullname,data);
  }

  getOneUser(user_id:any)
  {
    return this.http.get(this.baseUrl+'/getOneUser/'+user_id);
  }












}

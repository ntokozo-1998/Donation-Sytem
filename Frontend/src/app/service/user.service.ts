import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl : String = 'http://localhost:8080/api';
  fullname = localStorage.getItem('name')+' '+localStorage.getItem('surname')



  constructor(private http :HttpClient) { }

  createPost(data: any) {
    return this.http.post(this.baseUrl+'/addPost/'+localStorage.getItem('user_id'),data);
  }

  getPosts() {
    return this.http.get(this.baseUrl+'/getPosts');
  }

  getCompletedPosts(){
    return this.http.get(this.baseUrl+'/getCompleted/'+localStorage.getItem('user_id'))

  }

  getInProgressPosts(){
    return this.http.get(this.baseUrl+'/getInProgress/'+localStorage.getItem('user_id'))

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

  updateProfile(user_id:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/update/'+user_id,form);

  }

  getOnePost(id:any)
  {
    return this.http.get(this.baseUrl+'/getOnePost/'+id);
  }

  getOneUser(user_id:any)
  {
    return this.http.get(this.baseUrl+'/getOneUser/'+user_id);
  }










  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Post {
  id: number;
  title: string;
  location: string;
  image: string;
}

/*export interface PostArray{
  id: number;
  title: string;
  location: string;
  image: string;
}*/

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {
  }

//POST http://localhost:4200/posts
  public addPost(post: { id: null; title: any; location: any; image: ""; }): Promise<Post> {
    return this.http
      .post<Post>(`${this.apiUrl}`, post, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Type': 'application/json',
        }),
      })
      .toPromise();
  }
// Zugriff auf Backend GET http://localhost:4200/posts
  public visualizePost(): Promise<Post[]> {
    return this.http
      .get<Post[]>(`${this.apiUrl}`,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Type': 'application/json',
        }),
      })
      .toPromise();
  }
}

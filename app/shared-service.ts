import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class sharedService {
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=10');
  }

  editPost(data) {
    return this.http.post('url', data);
  }

  deletePost(data) {
    return this.http.post('url', data);
  }

  loadMorePost(offset: number, length: number) {
    return this.http.get('http://jsonplaceholder.typicode.com/posts?_start=' + offset + '&_limit=' + length);
  }
}

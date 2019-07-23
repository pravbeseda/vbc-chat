import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Post } from './post';
import { Group } from './group';

const API_URL = environment.apiUrl;

@Injectable()
export class ChatService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      //'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  // GET: /api/chat/group/{groupId}
  public getPosts(groupId: number): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + '/api/chat/group/' + groupId)
      //.catch(this.handleError);
  }

  // POST: /api/chat/group/{groupId}/send
  public newPost(post: Post): Observable<Post> {
    let url = API_URL + '/api/chat/group/' + post.groupId + '/send';
    console.log('ChatService.newPost', post.text, url);
    return this.http.post<Post>(url, post, this.httpOptions).pipe(
      //catchError(this.handleError('newPost', post))
    );
  }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(API_URL + '/groups')
  }

  private handleError (error: Response | any) {
    console.error('ChatService::handleError', error);
    return Observable.throw(error);
  }  

}

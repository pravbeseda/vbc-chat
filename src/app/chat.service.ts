import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group, Post } from './chat';

const API_URL = environment.apiUrl;

@Injectable()
export class ChatService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  // GET: /api/chat/group/{groupId}
  public getPosts(groupId: number): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + '/api/chat/group/' + groupId);
  }

  // POST: /api/chat/group/{groupId}/send
  public newPost(post: Post): Observable<Post> {
    const url = API_URL + '/api/chat/group/' + post.groupId + '/send';
    return this.http.post<Post>(url, post, this.httpOptions);
  }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(API_URL + '/groups');
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(API_URL + '/groups/' + group.id, group, this.httpOptions);
  }

}

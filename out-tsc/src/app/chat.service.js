import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpHeaders } from '@angular/common/http';
const API_URL = environment.apiUrl;
let ChatService = class ChatService {
    constructor(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }
    // GET: /api/chat/group/{groupId}
    getPosts(groupId) {
        return this.http.get(API_URL + '/api/chat/group/' + groupId);
    }
    // POST: /api/chat/group/{groupId}/send
    newPost(post) {
        let url = API_URL + '/api/chat/group/' + post.groupId + '/send';
        return this.http.post(url, post, this.httpOptions);
    }
    getGroups() {
        return this.http.get(API_URL + '/groups');
    }
    updateGroup(group) {
        return this.http.put(API_URL + '/groups/' + group.id, group, this.httpOptions);
    }
};
ChatService = tslib_1.__decorate([
    Injectable()
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map
import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ChatService } from '../chat.service';
import { Post } from '../post';
let ChatModalComponent = class ChatModalComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.stateActive = false;
        this.newMessage = '';
        this.sender = {
            name: 'Иванов Петр Сергеевич',
            position: 'Менеджер',
            orgName: 'ООО ВБЦ'
        };
        this.scrolltop = null;
    }
    ngOnInit() {
        moment.locale('ru');
    }
    showModal() {
        this.stateActive = true;
        this.readGroups();
    }
    hideModal() {
        this.stateActive = false;
    }
    selectGroup(groupId) {
        this.groupId = groupId;
        this.readPosts(this.groupId);
    }
    readGroups() {
        this.chatService.getGroups().subscribe((groups) => {
            this.groups = groups;
            if (this.groups.length > 0) {
                this.selectGroup(this.groupId || this.groups[0].id);
            }
            console.log('getGroups', this.groups);
        }, (err) => { this.handleHttpError(err); });
    }
    readPosts(groupId) {
        this.chatService.getPosts(groupId).subscribe((posts) => {
            this.posts = posts;
            this.scrollBottom();
            console.log('getPosts', this.posts);
        }, (err) => { this.handleHttpError(err); });
    }
    postMessage() {
        let post = new Post();
        post.text = this.newMessage;
        post.groupId = this.groupId;
        post.sender = this.sender;
        post.selfMsg = true;
        post.dateTimeCreate = moment().format();
        this.chatService.newPost(post).subscribe((p) => {
            this.posts.push(p);
            let group = this.groups.filter(group => group.id == this.groupId)[0];
            group.lastPostDate = p.dateTimeCreate;
            group.postsCount = this.posts.length;
            this.scrollBottom();
            this.chatService.updateGroup(group).subscribe(() => {
            }, (err) => { this.handleHttpError(err); });
        }, (err) => { this.handleHttpError(err); });
        this.newMessage = '';
    }
    getSignature(post) {
        let signature = [];
        if (post.sender) {
            if (post.sender.orgName) {
                signature.push(post.sender.orgName);
            }
            if (post.sender.position) {
                signature.push(post.sender.position);
            }
            if (post.sender.name) {
                signature.push(post.sender.name);
            }
        }
        return signature.join(' / ');
    }
    formatTime(post) {
        return (post && post.dateTimeCreate) ? moment(post.dateTimeCreate).format('HH:mm') : '';
    }
    formatDate(post) {
        return (post && post.dateTimeCreate) ? moment(post.dateTimeCreate).format('ll') : '';
    }
    formatGroupTime(group) {
        return (group && group.lastPostDate) ? moment(group.lastPostDate).format('DD.MM HH:mm') : '';
    }
    scrollBottom() {
        setTimeout(() => this.scrolltop = this.postsEl.nativeElement.scrollHeight, 0);
    }
    handleHttpError(error) {
        console.error('ChatService::handleError', error.message);
    }
};
tslib_1.__decorate([
    ViewChild('postsEl', null)
], ChatModalComponent.prototype, "postsEl", void 0);
ChatModalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-chat-modal',
        templateUrl: './chat-modal.component.html',
        styleUrls: ['./chat-modal.component.scss'],
        providers: [ChatService]
    })
], ChatModalComponent);
export { ChatModalComponent };
//# sourceMappingURL=chat-modal.component.js.map
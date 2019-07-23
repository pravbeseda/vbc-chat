import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { ChatService } from '../chat.service';
import { Post } from '../post';
import { Sender } from '../sender';
import { Group } from '../group';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss'],
  providers: [ChatService]
})
export class ChatModalComponent implements OnInit {
  stateActive = false;  
  newMessage = '';
  groupId: number;
  groups: Group[];  
  posts: Post[];
  sender: Sender = {
    name: 'Иванов Петр Сергеевич',
    position: 'Менеджер',
    orgName: 'ООО ВБЦ'
  }
  @ViewChild('postsEl', null) postsEl: ElementRef;  
  scrolltop: number = null;
  
  constructor(private chatService: ChatService) { }

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

  selectGroup(groupId: number) {
    this.groupId = groupId;
    this.readPosts(this.groupId);
  }

  readGroups() {
    this.chatService.getGroups().subscribe(
      (groups) => {
        this.groups = groups;
        if (this.groups.length > 0) {
          this.selectGroup(this.groupId || this.groups[0].id)
        }    
        console.log('getGroups', this.groups);
      }
    );
  }

  readPosts(groupId: number) {
    this.chatService.getPosts(groupId).subscribe(
      (posts) => {
        this.posts = posts;
        this.scrollBottom();
        console.log('getPosts', this.posts);
      }
    );
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
      });      
    });
    this.newMessage = '';
  }

  getSignature(post: Post): string {
    let signature: string[] = [];
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

  formatTime(post: Post): string {
    return (post && post.dateTimeCreate) ? moment(post.dateTimeCreate).format('HH:mm') : '';  
  }
  
  formatDate(post: Post): string {
    return (post && post.dateTimeCreate) ? moment(post.dateTimeCreate).format('ll') : '';  
  }

  formatGroupTime(group: Group): string {
    return (group && group.lastPostDate) ? moment(group.lastPostDate).format('DD.MM HH:mm') : '';
  }

  scrollBottom() {
    setTimeout(() => this.scrolltop = this.postsEl.nativeElement.scrollHeight, 0);
  }
  
    
}

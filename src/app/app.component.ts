import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ChatService]
})
export class AppComponent {
  title = 'Тестовое задание ВБЦ';
  errorDB = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.testDB();
  }

  testDB() {
    this.chatService.getGroups().subscribe(null, () => { this.errorDB = true });    
  }

}

import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ChatService } from './chat.service';
let AppComponent = class AppComponent {
    constructor(chatService) {
        this.chatService = chatService;
        this.title = 'Тестовое задание ВБЦ';
        this.errorDB = false;
    }
    ngOnInit() {
        this.testDB();
    }
    testDB() {
        this.chatService.getGroups().subscribe(null, () => { this.errorDB = true; });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        providers: [ChatService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
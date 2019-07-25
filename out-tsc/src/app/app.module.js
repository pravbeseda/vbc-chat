import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faPaperclip, faSignature, faExclamationTriangle, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModalComponent } from './chat-modal/chat-modal.component';
let AppModule = class AppModule {
    constructor() {
        library.add(faFile, faPaperclip, faSignature, faArrowRight, faExclamationTriangle, faCommentAlt);
    }
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            ChatModalComponent
        ],
        imports: [
            BrowserModule,
            HttpClientModule,
            AppRoutingModule,
            FormsModule,
            FontAwesomeModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
describe('ChatService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(ChatService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=chat.service.spec.js.map
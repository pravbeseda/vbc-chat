import { Sender } from './sender';

export class Post {
    id: number;
    groupId: number;
    selfMsg = false;
    sender: Sender;
    dateTimeCreate: string;
    text = '';    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export interface Group {
  id: number;
  title: string;
  org: string;
  lastPostDate: string;
  postsCount: number;
}

export interface Sender {
  name: string;
  position: string;
  orgName: string;
}

export interface Post {
  id?: number;
  groupId: number;
  selfMsg: boolean;
  sender: Sender;
  dateTimeCreate: string;
  text: string;
}

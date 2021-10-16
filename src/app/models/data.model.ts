import * as firebase from 'firebase/app';

export type DataFirestore = {
  id?: string;
  createdBy: string;
  createdOn: firebase.default.firestore.Timestamp;
}

export type DataRTDB = {
  id: string;
  createdBy: string;
  createdOn: number;
}

export type Data = {
  id: string;
  createdBy: string;
  createdOn: Date;
}

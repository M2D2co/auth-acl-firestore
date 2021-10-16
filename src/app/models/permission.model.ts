import * as firebase from 'firebase/app';

export type PermissionActions = 'admin' | 'create' | 'read' | 'update' | 'delete';

export type PermissionFirestore = {
  uid: string;
  createdBy: string;
  createdOn: firebase.default.firestore.Timestamp;
};

export type PermissionRTDB = {
  uid: string;
  createdBy: string;
  createdOn: number;
};

export type PermissionCollectionRTDB = {
  admin: PermissionRTDB[];
  create: PermissionRTDB[];
  read: PermissionRTDB[];
  update: PermissionRTDB[];
  delete: PermissionRTDB[];
};

export type Permission = {
  resourceId: string;
  uid: string;
  action: 'admin' | 'create' | 'read' | 'update' | 'delete'
  createdBy: string;
  createdOn: Date;
};

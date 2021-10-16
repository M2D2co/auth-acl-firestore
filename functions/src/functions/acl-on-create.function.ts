import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// tslint:disable-next-line: variable-name
export const onDataCreate_ACL_Create =
  functions.firestore.document('data/{resourceId}').onCreate(async (snapshot, context) => {
    const { resourceId } = context.params;
    const { createdBy } = snapshot.data();
    const value = {
      createdBy,
      createdOn: admin.firestore.FieldValue.serverTimestamp(),
    };

    const waitlist: Promise<any>[] = [];
    ['admin', 'create', 'read', 'update', 'delete'].forEach(action => {
      waitlist.push(
        admin.firestore().doc(`/acl/${resourceId}/${action}/${createdBy}`).create(value)
      );
    });

    // Wait for completion
    await Promise.all(waitlist);
  });

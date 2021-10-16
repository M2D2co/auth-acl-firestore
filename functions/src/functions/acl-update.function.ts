import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// tslint:disable-next-line: variable-name
export const onCall_ACL_Add = functions.https.onCall(async (data, context) => {
  const { action, resourceId, uid } = data;

  if (context.auth) {

    const adminPermission = (await admin.firestore().doc(`/acl/${resourceId}/admin/${context.auth.uid}`).get()).data();
    if (adminPermission) {
      admin.firestore().doc(`/acl/${resourceId}/${action}/${uid}`).create({
        createdBy: context.auth.uid,
        createdOn: admin.firestore.FieldValue.serverTimestamp(),
        uid,
      });
    } else {
      throw new functions.https.HttpsError('permission-denied', 'User does not have permissions for the requested resource.');
    }

  } else {
    throw new functions.https.HttpsError('unauthenticated', 'User does not exist or is not authenticated.');
  }
});

// tslint:disable-next-line: variable-name
export const onCall_ACL_Remove = functions.https.onCall(async (data, context) => {
  const { action, resourceId, uid } = data;

  if (context.auth) {

    const adminPermission = (await admin.firestore().doc(`/acl/${resourceId}/admin/${context.auth.uid}`).get()).data();
    if (adminPermission) {
      admin.firestore().doc(`/acl/${resourceId}/${action}/${uid}`).delete();
    } else {
      throw new functions.https.HttpsError('permission-denied', 'User does not have permissions for the requested resource.');
    }

  } else {
    throw new functions.https.HttpsError('unauthenticated', 'User does not exist or is not authenticated.');
  }
});

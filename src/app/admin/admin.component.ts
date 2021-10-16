import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DataFirestore, Data } from '../models/data.model';
import { Permission, PermissionActions, PermissionFirestore } from '../models/permission.model';
import { Profile, User } from '../models/user.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<boolean> = new Subject();

  private idparam: string;
  permissionForm: FormGroup;

  actions: { id: PermissionActions, name: string }[] = [
    { id: 'admin', name: 'Admin' },
    { id: 'create', name: 'Create' },
    { id: 'read', name: 'Read' },
    { id: 'update', name: 'Update' },
    { id: 'delete', name: 'Delete' }
  ];
  users: Observable<Profile[]> = null;
  item: Data = null;
  permissions: Permission[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private firstore: AngularFirestore,
    private rtdb: AngularFireDatabase,
    private remote: AngularFireFunctions,
  ) {
    this.permissionForm = this.fb.group({
      action: ['', [Validators.required]],
      user: ['', [Validators.required]],
    });

    this.route.params.pipe(
      tap(params => {
        const { id } = params;
        this.idparam = id;
      }),
      tap(params => {
        this.users = this.firstore.collection<Profile>('users').valueChanges({ idField: 'uid' });
      }),
      tap(params => {
        const { id } = params;
        this.permissions = [];
        this.actions.forEach(async action => {
          console.log(action);
          this.firstore.doc<PermissionFirestore[]>('acl/' + id).collection(action.id)
            .valueChanges({ idField: 'uid' }).pipe(tap(permissions => {
              console.log(permissions);
            }), map(permissions =>
              permissions.map((permission: PermissionFirestore) => ({
                ...permission,
                createdOn: permission.createdOn?.toDate(),
                resourceId: id,
                action: action.id,
              })),
              takeUntil(this.destroyed$),
            )).subscribe((permissions: Permission[]) => {
              console.log('should work', permissions);
              this.permissions = this.permissions.concat(permissions);
              console.log(action, this.permissions);
            });
        });
      }),
      switchMap(params => {
        const { id } = params;
        return this.firstore.doc<DataFirestore>('data/' + id).valueChanges({ idField: 'id' }).pipe(
          map(data => ({
            ...data,
            createdOn: data.createdOn.toDate(),
          }))
        );
      }),
      takeUntil(this.destroyed$),
    ).subscribe(data => {
      this.item = data;
    });
  }

  ngOnInit(): void {
  }

  async remove(action: string, uid: string): Promise<void> {
    await this.firstore.doc(`/acl/${this.idparam}/${action}/${uid}`).delete();
  }

  async add(event: Event): Promise<void> {
    event.preventDefault();

    const action = this.permissionForm.get('action').value;
    const uid = this.permissionForm.get('user').value;

    await this.firstore.doc(`/acl/${this.idparam}/${action}/${uid}`).set({
      createdBy: uid,
      createdOn: firebase.default.firestore.FieldValue.serverTimestamp(),
      uid,
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

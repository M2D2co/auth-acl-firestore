import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, USE_EMULATOR as AUTH_EMULATOR } from '@angular/fire/auth';
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import firebaseConfig from '../firebase.config.json';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { LogoutComponent } from './logout/logout.component';
import { AdminComponent } from './admin/admin.component';
import { DataComponent } from './data/data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireFunctionsModule, USE_EMULATOR as FUNCTION_EMULATOR } from '@angular/fire/functions';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInSuccessUrl: '/data',
  signInFlow: 'redirect',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: {
        // Forces account selection even when one account is available.
        prompt: 'select_account',
      },
    },
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    DataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    // Comment out when not emulating
    { provide: AUTH_EMULATOR, useValue: ['localhost', 9099] },
    { provide: FIRESTORE_EMULATOR, useValue: ['localhost', 8080] },
    { provide: FUNCTION_EMULATOR, useValue: ['localhost', 5001] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

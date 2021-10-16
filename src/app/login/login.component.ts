import { Component, OnInit } from '@angular/core';
import { FirebaseuiAngularLibraryService, FirebaseUISignInFailure } from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
  ) {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  ngOnInit(): void {
  }

  handleError(errorData: FirebaseUISignInFailure) {
    console.error(errorData);
    alert(errorData.code);
  }

}

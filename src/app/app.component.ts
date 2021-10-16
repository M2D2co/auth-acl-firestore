import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Authorization Models';
  user = this.auth.authState;

  constructor(
    private auth: AngularFireAuth,
  ) { }

}

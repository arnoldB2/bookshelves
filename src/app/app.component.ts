import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyCdYc6L3mtMT8QbzNLqHPjY-yPJBSyZu4o',
      authDomain: 'bookshelves-67776.firebaseapp.com',
      databaseURL: 'https://bookshelves-67776.firebaseio.com',
      projectId: 'bookshelves-67776',
      storageBucket: 'bookshelves-67776.appspot.com',
      messagingSenderId: '175834600307'
    };
    firebase.initializeApp(config);
  }
}

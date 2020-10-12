import { Injectable } from '@angular/core';
import {Book} from '../models/book.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase/app';
import {error} from 'util';
import {consoleTestResultHandler} from 'tslint/lib/test';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }
  emitBooks() {
    this.booksSubject.next(this.books);
  }

  // methode qui permet d'enregistre les livre dans la base de donnee
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  // methode de recuperation des donnees dans le base de donne
  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  // methode qui permet de recuperer les valeur d'un livre
  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
            // tslint:disable-next-line:no-shadowed-variable
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // methode permettent de creer un livre
  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  // methode permettant de supprimer les livres
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
}

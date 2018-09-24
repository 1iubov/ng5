import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private comments = new BehaviorSubject<any>(['Первый комментарий', 'Второй комментарий']);
  comment = this.comments.asObservable();

  private goals = new BehaviorSubject<any>(['Моя первая запись' , 'А это вторая запись']);
  goal = this.goals.asObservable();


  constructor() { }

  changeGoal(goal) {
    this.goals.next(goal);
  }

  changeComment(comment) {
    this.comments.next(comment);
  }



}



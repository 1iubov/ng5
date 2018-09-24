import { Component, OnInit} from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';
import { getHostElement } from '@angular/core/src/render3';
//import { create } from 'domain';
import { NgIf, NgForOf } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(15px)', offset: .4 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(15px)', offset: .4 }),
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 1 })
          ]))]), { optional: true })
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  commentcount: number;
  btnText: string = 'Добавить запись';
  btnCommentText: string = 'Добавить комментарий';
  goalText: string = 'Это моя новая запись';
  commentText = 'Это мой новый комментарий';
  goals: string[];
  comments = ['Первый'];
  arrcom = [this.goals, this.comments];
  comcount: number;
  n = '100';

  constructor(private _data: DataService) { }

  ngOnInit() {

    this._data.goal.subscribe(res => this.goals = res);
    this._data.comment.subscribe(res => this.comments = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
    this.comcount = this.comments.length;
    this._data.changeComment(this.comments);


  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;

  }


  addComment(i) {
    //this.arrcom[i].push(this.commentText[i]);
    //this.commentText[i] = 'Комментарий';
    //this.comcount = this.arrcom[i].length;
  }

  addCom() {
  this.comments.push(this.commentText);
  this.commentText = '';
  this._data.changeComment(this.comments);
  this.comcount = this.comments.length;
  }

  rememberI(i) {
    this.n = i;
  }


  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  removeCom(j) {
    this.comments.splice(j, 1);
    this._data.changeComment(this.comments);
    this.comcount = this.comments.length;
  }

}

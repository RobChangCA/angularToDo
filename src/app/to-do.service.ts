import { ToDo } from './model/toDo';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Priority } from './model/priority';

@Injectable({
  providedIn: 'root'
})
export class ToDoService{
  public _toDoSubject$ = new Subject;
  public toDoChanged$ = this._toDoSubject$.asObservable();
  
  data: ToDo[] = [
    {
      id: 1,
      name: 'test',
      description: 'test description',
      completed: false,
      dateCreated: new Date(2008, 6, 22),
      dateCompleted: null,
      priority: Priority.medium
    },
    {
      id: 2,
      name: 'test2',
      description: 'test2 description',
      completed: false,
      dateCreated: new Date(2018, 6, 22),
      dateCompleted: null,
      priority: Priority.high
    },
    {
      id: 3,
      name: 'test3',
      description: 'test3 description',
      completed: false,
      dateCreated: new Date(2019, 1, 22),
      dateCompleted: null,
      priority: Priority.low
    }
  ]

  updateToDoData(){
    this._toDoSubject$.next(this.data);
  }
  


}

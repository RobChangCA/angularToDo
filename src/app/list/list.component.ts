import { ToDoService } from './../to-do.service';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../model/todo';
import { MatDialog } from '@angular/material';
import { EditComponent } from '../edit/edit.component';
import { timeout } from 'q';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public toDoList: ToDo[];
  constructor(private _toDoService: ToDoService, public dialog: MatDialog) { }

  ngOnInit() {
    this._toDoService.toDoChanged$.subscribe(
      (x:ToDo[]) =>{
        this.toDoList = x;
      });
      this._toDoService.updateToDoData(); 
  }

  openEditor(toDoItem:ToDo){
    let dialogRef = this.dialog.open(EditComponent, {
     data: toDoItem
    })
    dialogRef.beforeClosed().subscribe(
      (x)=>{
        console.log(x);
        if (x){
          this.updateToDo(x);          
        }
    })
  }
  toggleCompleted(x:ToDo){
    x.completed = !x.completed;
    if (x.completed){
      x.dateCompleted = new Date
      this.updateToDo(x)
    }else{
    x.dateCompleted = null;
    }
  }
  onSave(x:ToDo){
  }

  newToDo(){
    let dialogRef = this.dialog.open(EditComponent)

    dialogRef.beforeClosed().subscribe((x: ToDo) =>{
      if(x)
        this.toDoList.push(x);
    })
  }
  
  updateToDo(x:ToDo){
    let itemIndex = this.toDoList.findIndex( index => index.id === x.id);
    this.toDoList.splice(itemIndex, 1, x)
  }
  
}

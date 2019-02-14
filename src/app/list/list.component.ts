import { ToDoService } from './../to-do.service';
import { Component, OnInit } from '@angular/core';
import { ToDo } from '../model/todo';
import { MatDialog } from '@angular/material';
import { EditComponent } from '../edit/edit.component';


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

  openEditor(x:ToDo){
    let dialogRef = this.dialog.open(EditComponent, {
     data: {
        name: x.name,
        description: x.description,
        priority: x.priority
      }
    })
    dialogRef.beforeClosed().subscribe(
      (x)=>{
    })
  }
  onCompleted(x:ToDo){
    x.completed = true;
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

  
}

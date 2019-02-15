import { ToDoService } from './../to-do.service';
import { Component, OnInit, Inject, Input, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDo } from '../model/todo';
import { Priority } from '../model/priority';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditComponent>, 
              @Inject(MAT_DIALOG_DATA) public inputData,
              private _toDoService: ToDoService) { }
  
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(),
    priority: new FormControl(Priority.low)
  })

  private _toDoItem:ToDo ;
  public priorityEnum = Priority;
  public priorityArray = [] 
  public saveFailed = false;
  

  ngOnInit() {
    this.priorityArray = Object.values(Priority);
    if(this.inputData){
      this.form.patchValue({
        name: this.inputData.name,
        description: this.inputData.description,
        priority: this.inputData.priority        
      });
    }
    this.initializeForm();
  }

  save(){
    if (this.form.valid){
      this.saveFailed = false;
      this.finalizeForm();
      this.dialogRef.close(this._toDoItem)
      return      
    }
    this.saveFailed = true;
  }

  closeModal(){
    this.dialogRef.close();
  }

  initializeForm(){
    console.log(this.inputData)
    this._toDoItem = {
      id: this.inputData ? this.inputData.id : this.newId(),
      name: this.inputData ? this.inputData.name : null,
      description: this.inputData ? this.inputData.description : null,
      completed: this.inputData ? this.inputData.completed : false,
      dateCreated: this.inputData ? this.inputData.dateCreated : new Date,
      dateCompleted: this.inputData ? this.inputData.dateCompleted : null,
      priority: this.inputData ? this.inputData.priority : Priority.low
    }    
  }
  
  finalizeForm(){
    const form = this.form.value;
    const toDo = this._toDoItem;
    toDo.name = form.name;
    toDo.description = form.description;
    toDo.priority = form.priority;
    }

  newId(){
    return this._toDoService.data.reduce(
      (acc, cur) => cur.id > acc ? cur.id : acc, 1
    ) + 1;
    
    // return Math.max(...this._toDoService.data.map(
    //   x => x.id
    //   )) + 1
  }
}

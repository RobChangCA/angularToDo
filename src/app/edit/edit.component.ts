import { ToDoService } from './../to-do.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToDo } from '../model/todo';
import { Priority } from '../model/priority';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 
  
  constructor(public dialogRef: MatDialogRef<EditComponent>, 
              @Inject(MAT_DIALOG_DATA) public inputData,
              private _toDoService: ToDoService) { }
  
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl()
  })

  private _toDoItem:ToDo 
  

  ngOnInit() {
    if(this.inputData){
      this.form.patchValue({
        name: this.inputData.name,
        description: this.inputData.description        
      });
    }
    this.initializeForm();
    console.log(this._toDoItem);
  }
  save(){
    //this.dialogRef.close(this.form)

  }
  closeModal(){
    this.dialogRef.close();
  }
  initializeForm(){
    this._toDoItem = {
      id: this.inputData ? this.inputData.id : this.newId(),
      name: this.inputData ? this.inputData.name : null,
      description: this.inputData ? this.inputData.description : null,
      completed: this.inputData ? this.inputData.completed : false,
      dateCreated: this.inputData ? this.inputData.dateCreated : null,
      dateCompleted: this.inputData ? this.inputData.dateCompleted : null,
      priority: this.inputData ? this.inputData.priority : null
    }    
  }

  newId(){
    let idArray = [];
    this._toDoService.data.map(
      (x) =>{
        idArray.push(x.id); 
      });
    return Math.max(...idArray) + 1;
  }
}

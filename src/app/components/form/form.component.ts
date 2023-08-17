import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestType } from './form.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  // FormGroup

  testForm: FormGroup = this._formBuilder.nonNullable.group({
    testArray: this._formBuilder.array([
      this._formBuilder.nonNullable.group({
        title: ['¿Cuál es su nombre?'],
        type: ['text'],
        value: [null, [Validators.required, Validators.minLength(3)]],
        placeHolder: ['Digite al menos 3 caracteres.'],
        validable: [false],
      }),
      this._formBuilder.nonNullable.group({
        title: ['¿Cuánto es 2+2?'],
        type: ['radio'],
        options: [[2, 4, 9, 10]],
        value: [null, [Validators.required]],
        valid: [4],
        validable: [true],
      }),
      this._formBuilder.nonNullable.group({
        title: ['¿Cuánto es 4+6?'],
        type: ['radio'],
        options: [[6, 4, 9, 10]],
        value: [null, [Validators.required]],
        valid: [10],
        validable: [true],
      }),
      this._formBuilder.nonNullable.group({
        title: ['¿Cuánto es 3+2?'],
        type: ['radio'],
        options: [[2, 5, 9, 10]],
        value: [null, [Validators.required]],
        valid: [5],
        validable: [true],
      }),
      this._formBuilder.nonNullable.group({
        title: ['¿Cuánto es 7+1?'],
        type: ['radio'],
        options: [[2, 4, 9, 8]],
        value: [null, [Validators.required]],
        valid: [8],
        validable: [true],
      }),
    ]),
  });

  //Variables

  isEditable = false;

  // Constructor

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  // LifeCycle

  // Get

  get testArray(): FormArray {
    return this.testForm.get('testArray') as FormArray;
  }

  // Functions

  getPropertiesArray(index: number): TestType {
    return this.testArray.controls[index].value;
  }

  formGroupValid(index: number): boolean {
    return this.testArray.controls[index].invalid;
  }

  finishTest(): void {
    const questions: TestType[] = this.testArray.value;
    const validableQuestions: TestType[] = questions.filter(
      (f) => f.validable === true
    );

    let correctQuestions: number = 0;

    for (const vq of validableQuestions) {
      if (vq.value === vq.valid) {
        correctQuestions += 1;
      }
    }

    const isCorrect =
      correctQuestions > validableQuestions.length / 2 ? true : false;

    this.snackBar.open(
      `Has obtenido ${correctQuestions} correctas. ${
        isCorrect ? 'Felicitaciones' : 'Sigue estudiando'
      }`,
      'Ok',
      { duration: 6000 }
    );
    this.testForm.reset();
    console.log(this.testForm.value);

    this.stepper.reset();
  }
}

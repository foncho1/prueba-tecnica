import { Component, ViewChild } from '@angular/core';
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
  // Decorators

  // Referencia a stepper
  @ViewChild('stepper') stepper!: MatStepper;

  // FormGroup

  //Se define formulario de preguntas
  testForm: FormGroup = this._formBuilder.nonNullable.group({
    // Definición de formarray
    testArray: this._formBuilder.array([
      // Definición de formgroup
      this._formBuilder.nonNullable.group({
        // Definición de formcontrols
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

  // Obtiene formarray de preguntas
  get testArray(): FormArray {
    return this.testForm.get('testArray') as FormArray;
  }

  // Functions

  // Devuelve valores de una posicion
  getPropertiesArray(index: number): TestType {
    return this.testArray.controls[index].value;
  }

  // Valida formgroup dado
  formGroupValid(index: number): boolean {
    return this.testArray.controls[index].invalid;
  }

  // Validar test
  finishTest(): void {
    // Todas las preguntas
    const questions: TestType[] = this.testArray.value;

    // Todas las preguntas validables
    const validableQuestions: TestType[] = questions.filter(
      (f) => f.validable === true
    );

    // Cantidad de respuestas correctas
    let correctQuestions: number = 0;

    // Validación de respuestas
    for (const vq of validableQuestions) {
      if (vq.value === vq.valid) {
        correctQuestions += 1;
      }
    }

    // Dice si pasó el formulario
    const isCorrect =
      correctQuestions > validableQuestions.length / 2 ? true : false;

    // Mensaje usuario
    this.snackBar.open(
      `Has obtenido ${correctQuestions} correctas. ${
        isCorrect ? 'Felicitaciones' : 'Sigue estudiando'
      }`,
      'Ok',
      { duration: 6000 }
    );

    // Reseteo valores del formulario
    this.testForm.reset();

    // Reseteo stepper
    this.stepper.reset();
  }
}

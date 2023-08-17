import { FormControl } from '@angular/forms';

export type TestType = {
  title: string;
  type: 'radio' | 'text';
  options?: any;
  value: any;
  placeHolder?: string;
  valid?: any;
  validable?: boolean;
};

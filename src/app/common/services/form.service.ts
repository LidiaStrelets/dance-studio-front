import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public inputStyles = {
    '--highlight-background': 'none',
  };
  public keyInputStyles = {
    color: 'var(--highlight-color-invalid)',
    '--highlight-background': 'var(--highlight-color-invalid)',
    'border-bottom': '1px solid var(--highlight-color-invalid)',
  };

  constructor() {}
}

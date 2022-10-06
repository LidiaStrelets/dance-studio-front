import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Common {
  inputStyles = {
    '--highlight-background': 'none',
  };
  keyInputStyles = {
    color: 'var(--highlight-color-invalid)',
    '--highlight-background': 'var(--highlight-color-invalid)',
    'border-bottom': '1px solid var(--highlight-color-invalid)',
  };
}

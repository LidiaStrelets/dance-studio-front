import { FormControl, FormGroup } from '@angular/forms';

export type RegistrationForm = FormGroup<{
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  role: FormControl<string | null>;
  key: FormControl<string | null>;
}>;

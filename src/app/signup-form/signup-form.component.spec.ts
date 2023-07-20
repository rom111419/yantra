import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [SignupFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should mark email as invalid when empty', () => {
    const emailControl = component.userForm.get('email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.required).toBeTruthy();
  });

  it('should mark email as invalid when invalid email format', () => {
    const emailControl = component.userForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.email).toBeTruthy();
  });

  it('should mark password as invalid when empty', () => {
    const passwordControl = component.userForm.get('password');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.required).toBeTruthy();
  });

  it('should mark password as invalid when it does not meet criteria', () => {
    const passwordControl = component.userForm.get('password');
    passwordControl?.setValue('weak');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.invalidPassword).toBeTruthy();
  });

  it('should mark form as valid when all fields are filled correctly', () => {
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'StrongPassword1',
    });
    expect(component.userForm.valid).toBeTruthy();
  });
});

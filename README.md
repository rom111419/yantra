# Signup Form Component
The Signup Form Component is a reusable Angular component that provides a sign-up form for user registration. It allows users to enter their first name, last name, email, and password. The component provides real-time validation for the input fields, ensuring that the data entered by the user meets the specified criteria.

# Features
- Input fields for First Name, Last Name, Email, and Password with real-time validation.
- Password validation criteria:
- Minimum of eight characters
- Must contain both lowercase and uppercase letters
- Should not contain the user's first or last name
- Email validation to ensure a valid email format.
- HTTP POST request to register the user upon form submission.

Usage
- The SignupFormComponent will render a sign-up form in your application. Users can enter their details, and the form will validate the input in real-time. Once the form is filled correctly, users can click the "Submit" button to register.

- Upon successful registration, the component will make an HTTP POST request to the server, sending the user's details to a specified endpoint for processing.

- Please note that you may need to customize the form submission behavior by modifying the onSubmit() method inside the component to match your backend API endpoint and logic.

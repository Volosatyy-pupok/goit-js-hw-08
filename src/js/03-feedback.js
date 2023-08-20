import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const localStorageKey = 'feedback-form-state';

// Function to save the form state to local storage
const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

// Function to load the form state from local storage and populate the form fields
const loadFormState = () => {
  const savedState = localStorage.getItem(localStorageKey);
  if (savedState) {
    const formData = JSON.parse(savedState);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

// Function to clear the form state from local storage and reset the form fields
const clearFormState = () => {
  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageTextarea.value = '';
};

// Listen for the 'input' event on the form fields and save the form state to local storage
const onFormInput = throttle(() => {
  saveFormState();
}, 500); // Throttle the saving to once per 500 milliseconds

// Listen for the 'submit' event on the form and handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Form submitted with the following data:');
  console.log({
    email: emailInput.value,
    message: messageTextarea.value,
  });
  clearFormState();
});

// Load the form state from local storage on page load
loadFormState();

// Add 'input' event listeners to the form fields
emailInput.addEventListener('input', onFormInput);
messageTextarea.addEventListener('input', onFormInput);

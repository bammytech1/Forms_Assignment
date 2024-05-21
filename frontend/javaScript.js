const form = document.getElementById("myForm");
const errorMessages = {
  firstName: "First Name is required.",
  lastName: "Last Name is required.",
  otherNames: "Other Names should not contain numbers.",
  email: "Invalid Email Address.",
  phoneNumber: "Phone Number must be exactly 10 digits.",
  gender: "Gender is required.",
};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});

function validateForm() {
  removeErrorMessages();

  let isValid = true;

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const otherNamesInput = document.getElementById("otherNames");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const genderSelect = document.getElementById("gender");

  if (!firstNameInput.value.trim()) {
    isValid = false;
    showErrorMessage(firstNameInput, errorMessages.firstName);
  }

  if (!lastNameInput.value.trim()) {
    isValid = false;
    showErrorMessage(lastNameInput, errorMessages.lastName);
  }

  if (otherNamesInput.value.trim() && !validateName(otherNamesInput.value)) {
    isValid = false;
    showErrorMessage(otherNamesInput, errorMessages.otherNames);
  }

  const emailPattern = /^[\w.-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailPattern.test(emailInput.value)) {
    isValid = false;
    showErrorMessage(emailInput, errorMessages.email);
  }

  if (!/^\d{10}$/.test(phoneNumberInput.value)) {
    isValid = false;
    showErrorMessage(phoneNumberInput, errorMessages.phoneNumber);
  }

  if (!genderSelect.value) {
    isValid = false;
    showErrorMessage(genderSelect, errorMessages.gender);
  }

  if (isValid) {
    submitForm();
  }
}

function removeErrorMessages() {
  const errorMessageElements = document.querySelectorAll(".error-message");
  errorMessageElements.forEach(function (errorMessageElement) {
    errorMessageElement.remove();
  });
}

function showErrorMessage(inputElement, message) {
  inputElement.classList.add("invalid");
  let parent = inputElement.parentElement;
  let errorMessage = document.createElement("span");
  errorMessage.classList.add("error-message");
  errorMessage.innerText = message;
  parent.append(errorMessage);
}

function validateName(name) {
  var letters = /^[A-Za-z]+$/;
  return letters.test(name);
}

function submitForm() {
  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    otherNames: document.getElementById("otherNames").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    gender: document.getElementById("gender").value,
  };

  // Here you would normally send the data to the server.
  // For demonstration purposes, we just log it to the console.
  console.log("Form submitted successfully:", formData);
  alert("Form submitted successfully!");
}

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
  const formData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    otherNames: document.getElementById("otherNames").value.trim(),
    email: document.getElementById("email").value.trim(),
    phoneNumber: document.getElementById("phoneNumber").value.trim(),
    gender: document.getElementById("gender").value,
  };

  if (!formData.firstName) {
    isValid = false;
    showErrorMessage(
      document.getElementById("firstName"),
      errorMessages.firstName
    );
  }

  if (!formData.lastName) {
    isValid = false;
    showErrorMessage(
      document.getElementById("lastName"),
      errorMessages.lastName
    );
  }

  if (formData.otherNames && !validateName(formData.otherNames)) {
    isValid = false;
    showErrorMessage(
      document.getElementById("otherNames"),
      errorMessages.otherNames
    );
  }

  const emailPattern = /^[\w.-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailPattern.test(formData.email)) {
    isValid = false;
    showErrorMessage(document.getElementById("email"), errorMessages.email);
  }

  if (!/^\d{10}$/.test(formData.phoneNumber)) {
    isValid = false;
    showErrorMessage(
      document.getElementById("phoneNumber"),
      errorMessages.phoneNumber
    );
  }

  if (!formData.gender) {
    isValid = false;
    showErrorMessage(document.getElementById("gender"), errorMessages.gender);
  }

  if (isValid) {
    submitForm(formData);
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
  const letters = /^[A-Za-z]+$/;
  return letters.test(name);
}

function submitForm(formData) {
  fetch("https://forms-assignment-hgtd.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.errors) {
        Object.keys(data.errors).forEach((key) => {
          showErrorMessage(document.getElementById(key), data.errors[key]);
        });
      } else {
        alert("Form submitted successfully!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

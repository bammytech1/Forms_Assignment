const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const formData = req.body;

  // Validate the data
  const errors = validateFormData(formData);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // Save the data to database.json
  const filePath = path.join(__dirname, 'database.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database file' });
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    jsonData.push(formData);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to database file' });
      }

      res.status(200).json({ message: 'Form submitted successfully' });
    });
  });
});

function validateFormData(data) {
  const errors = {};

  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = 'First Name is required.';
  }

  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = 'Last Name is required.';
  }

  if (data.otherNames && !validateName(data.otherNames)) {
    errors.otherNames = 'Other Names should not contain numbers.';
  }

  const emailPattern = /^[\w.-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailPattern.test(data.email)) {
    errors.email = 'Invalid Email Address.';
  }

  if (!/^\d{10}$/.test(data.phoneNumber)) {
    errors.phoneNumber = 'Phone Number must be exactly 10 digits.';
  }

  if (!data.gender) {
    errors.gender = 'Gender is required.';
  }

  return errors;
}

function validateName(name) {
  const letters = /^[A-Za-z]+$/;
  return letters.test(name);
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Require the express module
const express = require('express');

// Require the data.json
const data = require('./data.json');

// Create an express application
const app = express();
const projects = data.projects;

// Here I set the view engine to pug
app.set('view engine', 'pug');

app.use('/static', express.static('public'));

// Route set up to view the home page
app.get('/', (req, res) => {
  res.render('index', {projects});
});

// Route set up to view the about page
app.get('/about', (req, res) => {
  res.render('about');
});

// Route set up to view the project page, each project through its id
app.get('/project/:id', (req, res, next) => {
  const { id } = req.params;
  const project = projects[id];
  if (id >= projects.length || isNaN(id)) {
    res.locals.error = {
      message: "Sorry, project does not exist",
      status: 404,
      stack: "Try another page"
    };
    return res.render('error');
  }
  res.render('project', {project});
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler that sets the error message to a user friendly message, and sets the status code.
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render('error')
  console.log("Cannot find the page")
})

// App runs on port 3000, and logs a string to the console that says which port the app is listening to.
app.listen(3000, () => {
  console.log('The application is running in localhost:3000 !')
});

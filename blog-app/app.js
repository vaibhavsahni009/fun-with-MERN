// Import modules using ES6 syntax
import express from 'express';
import path from 'path';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views')); // Set views directory

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Enable JSON parsing for API requests
let postIdCounter = 1; // Initialize the counter

// Sample data (replace with a database in a real-world scenario)
let posts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex !== -1) {
    posts[postIndex] = {
      id,
      title: req.body.title,
      content: req.body.content
    };
  }
  res.redirect('/');
});

app.post('/create', (req, res) => {
  const newPost = {
    id: postIdCounter++, // Use the current counter value and then increment
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.redirect('/');
});

app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.sendStatus(204); // Send a "No Content" response
});

// Serve the client-side script
app.use('/script.js', express.static('public/script.js'));

app.listen(port, () => {
  console.log(`Blog App listening at http://localhost:${port}`);
});

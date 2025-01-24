const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json5');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/feedback', (req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name || !email || !message || !phone) {
    return res.status(400).json({
      status: 'error',
      fields: {
        ...(name ? {} : { name: 'This field cannot be empty: Your Name.' }),
        ...(email ? {} : { email: 'This field cannot be empty: Your Email.' }),
        ...(message ? {} : { message: 'This field cannot be empty: Your Phone.' }),
        ...(phone ? {} : { message: 'This field cannot be empty: Message.' }),
      },
    });
  }

  const newEntry = {
    id: Date.now(),
    name,
    email,
    message,
    phone,
  };

  router.db.get('feedback').push(newEntry).write();

  return res.status(201).json({
    status: 'success',
    msg: 'Your application has been successfully submitted.',
  });
});

server.use(router);

server.listen(5001, () => {
  console.log('JSON Server is running on http://localhost:5001');
});

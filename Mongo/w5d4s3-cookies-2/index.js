const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

app.use(cookieParser());

// Root route: count visits
app.get('/', (req, res) => {
  let visitCount = parseInt(req.cookies.visitCount || '0', 10);
  visitCount += 1;

  res.cookie('visitCount', visitCount, { httpOnly: true });
  res.send(`You have visited this site ${visitCount} time${visitCount > 1 ? 's' : ''}.`);
});

// Reset route: clear visit count
app.get('/reset-visits', (req, res) => {
  res.clearCookie('visitCount');
  res.send('Visit counter has been reset.');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

import express from "express";
const app = express();
const port = 5000;

app.get('/contributor', (req, res) => {
  res.send('DevPulse Server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// 7-1
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 8080;

// Endpoint to fetch kubectl data
app.get('/api/pod-status', (req, res) => {
  exec('kubectl get all -n project', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      return res.status(500).send(`Stderr: ${stderr}`);
    }
    res.send(`<pre>${stdout}</pre>`); // Sends formatted output
  });
});

// Serve static frontend files
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://<your-ip>:${port}`);
});

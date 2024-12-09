const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve the static UI files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to display pod status (runs 'kubectl get all -n project')
app.get('/pod-status', (req, res) => {
    exec('kubectl get all -n project', (err, stdout, stderr) => {
        if (err) {
            console.error('Error executing command:', err);
            return res.status(500).send(`<pre>Error: ${stderr}</pre>`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://<external-ip>:${PORT}`);
});

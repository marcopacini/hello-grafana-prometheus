const express = require('express');
const prometheus = require('prom-client');

// enable prom-client to expose default application metrics
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
 
// define a custom prefix string for application metrics
collectDefaultMetrics({ prefix: 'app_' });

const app = express();
const port = process.argv[2] || 9091;

const counter = new prometheus.Counter({
    name: 'app_http_request_total',
    help: 'http request total metric',
    labelNames: ['route', 'method', 'status']
});

app.get('/metrics', (_, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
})

app.get('/hello', (req, res) => {
    const { name = 'you' } = req.query;
    res.json({ message: `Hello, ${name}!` });
    counter.labels('/hello', 'GET', '200').inc();
});

app.listen(port, () => {
    console.log(`Listening at :${port}`);
});

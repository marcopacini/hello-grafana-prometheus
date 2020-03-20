# hello-grafana-prometheus

Just a playground for getting started with Prometheus and Grafana.

### Components
- App (node.js)
- Prometheus Server
- Node Exporter
- Grafana Server

### Run 
```
docker-compose up
```

###### Grafana datasources (automatic.yml)
```yml
datasources:
    - name: Prometheus
      type: prometheus
      access: proxy
      orgId: 1
      url: http://prometheus:9090
```

###### App metrics scraping (prometheus.yml)
```yml
scrape_configs:
    - job_name: 'app'
      scrape_interval: 5s
      static_configs:
        - targets: ['app:9091']
```

###### prom-client
```js
const counter = new prometheus.Counter({
    name: 'app_http_request_total',
    help: 'http request total metric',
    labelNames: ['route', 'method', 'status']
});

counter.labels('/path/to/', 'GET', '200').inc();

app.get('/metrics', (_, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
})
```

### Extra

- After connecting your data source, you can import the **node-exporter** metrics
dashboard just copying its dashboard ID (405) in Grafana: *Create - Import*.

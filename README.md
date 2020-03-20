# hello-monitoring

Just a playground for getting started with Prometheus and Grafana.

### Components:
- App (node.js)
- Prometheus Server
- Node Exporter
- Grafana Server

## Run 
```
docker-compose up
```

## Setup

- After connecting your data source, you can import the **node-exporter** metrics
dashboard just copying its dashboard ID (405) in Grafana: *Create - Import*.

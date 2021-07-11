# OpenTelemetry Datadog Tracing POC
- this project aims to compare OpenTelemetry and Datadog Tracing capabilities

# Getting Started
1. `npm install`
2. Duplicate `otel-agent-config.example.yaml`. Provide your own Datadog API Key
3. Set `DD_API_KEY=Datadog API key`. Provide your own Datadog API Key for Datadog Agent
4. `docker-compose up`
5. `npm start` - This starts up services in `run.js`
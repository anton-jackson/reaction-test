# Reaction Time Test

A web application to measure and track reaction times. Built with React, TypeScript, and Vite, deployed on AWS S3 with Lambda backend.

## Features

- Simple reaction time test interface
- Age-based data collection
- Results stored in S3 via Lambda
- CSV data export
- Admin view for result analysis

## Tech Stack

- Frontend: React + TypeScript
- Build Tool: Vite
- Hosting: AWS S3
- Backend: AWS Lambda
- Storage: S3 (CSV)

## Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

The application is deployed to:
- Frontend: http://antonjackson.com/reaction-time.html
- Data: http://antonjackson.com/results.csv

## Environment Variables

Create a `.env` file with:
```
VITE_API_KEY=your_api_key
```

## License

MIT 
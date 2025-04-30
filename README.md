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

2. Configure AWS Credentials:
   - Install AWS CLI: https://aws.amazon.com/cli/
   - Run `aws configure` and enter your credentials
   - These credentials will be used automatically by the application
   - Never store AWS credentials in the project files

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

The application is deployed to:
- Frontend: http://antonjackson.com/reaction-time.html
- Data: http://antonjackson.com/results.csv

## Security Notes

This application uses the AWS SDK's default credential provider chain, which means:
- For local development: Uses credentials from AWS CLI configuration
- For Lambda: Uses IAM role attached to the Lambda function
- Never stores credentials in code or environment files
- Follows AWS security best practices

## License

MIT 
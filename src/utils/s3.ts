import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'us-east-1'  // Using default region, can be configured via AWS CLI
});

export interface ReactionResult {
  timestamp: string;
  age: string;
  reactionTime: number;
}

export async function appendToCSV(result: ReactionResult) {
  const bucket = 'antonjackson.com';
  const key = 'results.csv';
  
  try {
    // Try to get existing file
    let existingContent = '';
    try {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );
      
      if (response.Body) {
        existingContent = await response.Body.transformToString();
      }
    } catch (error) {
      // File doesn't exist yet, we'll create it
      existingContent = 'timestamp,age,reactionTime\n';
    }

    // Add new row
    const newRow = `${result.timestamp},${result.age},${result.reactionTime}\n`;
    const updatedContent = existingContent + newRow;

    // Upload updated file
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: updatedContent,
        ContentType: 'text/csv',
      })
    );

    return true;
  } catch (error) {
    console.error('Error appending to CSV:', error);
    return false;
  }
} 
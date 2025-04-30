const isDevelopment = process.env.NODE_ENV === 'development';

const API_URL = isDevelopment 
  ? 'http://localhost:5173/results'  // Development URL
  : 'https://oo008a2fld.execute-api.us-east-1.amazonaws.com/prod/results';  // Production URL

// For development, we'll just log to console instead of linking to S3
export function getResultsUrl(): string {
  if (isDevelopment) {
    return '/results';
  }
  return 'http://antonjackson.com/results.csv';
}

export interface ReactionResult {
  timestamp?: string;
  age: string;
  reactionTime: number;
}

function saveToLocalStorage(result: ReactionResult) {
  const existingResults = localStorage.getItem('reactionResults');
  const results = existingResults ? JSON.parse(existingResults) : [];
  results.push(result);
  localStorage.setItem('reactionResults', JSON.stringify(results));
}

export async function saveResult(result: ReactionResult): Promise<boolean> {
  if (isDevelopment) {
    saveToLocalStorage(result);
    return true;
  }

  try {
    // Format the data to match the working test case
    const data = {
      timestamp: new Date().toISOString(),
      age: String(result.age),
      reactionTime: result.reactionTime
    };

    console.log('Data before stringify:', data);
    const requestBody = JSON.stringify({
      body: JSON.stringify(data)
    });
    console.log('Stringified request body:', requestBody);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response body:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to save result: ${responseText}`);
    }

    return true;
  } catch (error) {
    console.error('Error saving result:', error);
    return false;
  }
} 
import { test, expect } from '@playwright/test';

test.describe('Sport5 API Integration Tests', () => {

  test('Verify GetNewsRoomTS dynamic Ajax Endpoint', async ({ request }) => {
    // Sport5 uses this Ajax endpoint to get the latest Newsroom updates/timestamps
    const response = await request.get('https://www.sport5.co.il/Ajax/GetNewsRoomTS.aspx');
    
    // Validate response code is 200 OK
    expect(response.status()).toBe(200);
    
    // Get text body content
    const bodyText = await response.text();
    console.log('Ajax GetNewsRoomTS Response text:', bodyText);
    
    // Verify it returns a response (e.g., timestamp string or non-empty value)
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('Verify Homepage network response headers', async ({ request }) => {
    // Check main homepage server headers
    const response = await request.get('https://www.sport5.co.il/');
    
    expect(response.status()).toBe(200);
    const headers = response.headers();
    
    // Assert Content-Type header is text/html
    expect(headers).toHaveProperty('content-type');
    expect(headers['content-type']).toContain('text/html');
    
    console.log('Homepage API request response headers successfully verified.');
  });
});

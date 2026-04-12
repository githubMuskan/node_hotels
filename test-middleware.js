const testMiddleware = async () => {
  try {
    // Test without token
    console.log('Test 1: Without token');
    const response1 = await fetch('http://localhost:3000/person', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data1 = await response1.json();
    console.log('Status:', response1.status);
    console.log('Response:', data1);
    console.log('---');

    // Test with valid token
    console.log('Test 2: With valid token (Bearer format)');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZGE2YWMzNjI2ODFjNmQyZGVjYWVlOCIsInVzZXJuYW1lIjoidGVzdHVzZXIxNzc1OTIxODU5MTE5IiwiaWF0IjoxNzc1OTk1MTMzLCJleHAiOjE3NzU5OTY5MzN9.B-6sEXBCda72xSvKBiz6Mk2K8qkMsGxOX6MGcsnncPo';
    
    const response2 = await fetch('http://localhost:3000/person', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response length:', Array.isArray(data2) ? data2.length : 'not array');
    console.log('---');

    // Test with invalid token
    console.log('Test 3: With invalid token');
    const response3 = await fetch('http://localhost:3000/person', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid_token_here'
      }
    });

    const data3 = await response3.json();
    console.log('Status:', response3.status);
    console.log('Response:', data3);

  } catch (err) {
    console.error('Error:', err.message);
  }
};

testMiddleware();

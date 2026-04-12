const testProfile = async () => {
  try {
    // First get a valid token by logging in
    const loginResponse = await fetch('http://localhost:3000/person/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'testuser1775921859119',
        password: 'password123'
      })
    });

    const loginData = await loginResponse.json();
    if (!loginData.token) {
      console.error('Failed to get token:', loginData);
      return;
    }

    const token = loginData.token;
    console.log('Got token:', token.substring(0, 50) + '...');
    console.log('---');

    // Now test the profile endpoint
    console.log('Testing /profile endpoint with valid token:');
    const profileResponse = await fetch('http://localhost:3000/person/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const profileData = await profileResponse.json();
    console.log('Status:', profileResponse.status);
    console.log('Response:', JSON.stringify(profileData, null, 2));

  } catch (err) {
    console.error('Error:', err.message);
  }
};

testProfile();

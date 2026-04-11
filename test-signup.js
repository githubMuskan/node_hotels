const testSignup = async () => {
  try {
    const response = await fetch('http://localhost:3000/person/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User ' + Date.now(),
        age: 30,
        work: 'chef',
        mobile: '9999999999',
        email: 'test' + Date.now() + '@example.com',
        address: 'Test Address',
        salary: 50000,
        username: 'testuser' + Date.now(),
        password: 'password123'
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
};

testSignup();

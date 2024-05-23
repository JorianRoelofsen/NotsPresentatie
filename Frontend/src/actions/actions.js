const API_URL = 'http://localhost:4000';

export const handleGetRequest = async () => {
  try {
    const response = await fetch(`${API_URL}/hello`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export const handlePostRequest = async (name) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
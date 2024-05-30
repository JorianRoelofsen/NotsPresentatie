// Stap 3.1
const API_URL = 'http://localhost:4000';

export const handleGetRequest = async () => {
  try {
    const response = await fetch(`${API_URL}/hello`);
    //stap 3.9

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
}

export const handlePostRequest = async (mail) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail }),
    });
    //stap 3.9
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
}
import { API_BASE_URL } from './constants';

export class HTTPService {
  apiBaseUrl = API_BASE_URL;

  async handleResponse(response) {
    if (!response.ok) {
      if (response.status === 400) {
        return response.json();
      }

      throw new Error(`HTTP Service error! Status: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  }

  async postRequest(endpoint, data) {
    const res = await fetch(`${this.apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await this.handleResponse(res);
  }
}

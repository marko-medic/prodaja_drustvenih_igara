import axios from 'axios';

class HttpServis {
  constructor() {
    this.httpInstanca = axios.create({
      baseURL: `https://firestore.googleapis.com/v1/projects/${
        import.meta.env.VITE_REMOTE_PROJECT_ID
      }/databases/(default)/documents/`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default HttpServis;

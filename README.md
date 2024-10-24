# Client

Tech Stack Used:

- Vite
- React
- MUI

Create .env file and include the following:

- VITE_API_BASE_URL - which is the base URL of the server (eg: VITE_API_BASE_URL="http://localhost:8080")

Running the client:

```bash
npm install
```

```bash
npm run dev
```

#server

Tech Stack used:

- Express
- MongoDb
- JWT
- Rest Apis
- Mailjet

Create a .env file and include the following:

- MAILJET_API_KEY
- MAILJET_SECRET_KEY - These two of them are used for mailing purpose for Forgot Password. And can be got from mailjet website under developer section
- PORT - server port
- CLIENT_PORT - client port
- MONGO_URI
- JWT_SECRET - Any Random String

Running the server:

```bash
npm install
```

```bash
npm run dev
```

Note: 
- The protected route '/api/get-downloaded-songs' in backend.
- The mailing service for forget password is done in the backend but it is not integrated with the frontend.
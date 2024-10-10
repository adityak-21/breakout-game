# Leaderboard Backend

## 1. Backend URL

You can access the backend for this project at the following URL:

[Backend Link](https://backend-1-cr8v.onrender.com)

## 2. API Endpoints

The server provides the following API endpoints for interacting with the leaderboard:

- **POST /api/leaderboard**
  - Description: Insert a new name and score into the leaderboard.
  - Request Body:
    ```json
    {
      "name": "Player Name",
      "score": 100
    }
    ```
  - Response:
    ```json
    {
      "message": "Entry added successfully"
    }
    ```

- **GET /lead**
  - Description: Retrieve the top 10 entries from the leaderboard.
  - Response:
    ```json
    [
      {
        "name": "Player 1",
        "score": 100
      },
      {
        "name": "Player 2",
        "score": 95
      },
      ...
    ]
    ```

# 3. Scripts
## Execute these in the ./server folder
```bash
npm install
```
## 1. Start Script

```bash
# Start the server by running server.js
node server.js
```

## 2. For running test
```bash
npm run test
```

## 3. For coverage report
```bash
npm run coverage
``` 


## Project Links

- [Github Repository](https://github.com/adityak-21/breakout-game)
- [Deployed Website](https://adityak-21.github.io/breakout-game/client/)
- [Architecture Diagram](./Untitled%201.jpg)
- [Integration Test Coverage](https://adityak-21.github.io/breakout-game/server/coverage/lcov-report/)
- [Frontend Test Coverage](https://kartik-r-soni.github.io/breakout-game-code-coverage/)

---

## Implementation Details

This project builds on the client-server architecture introduced in Assignment 2, with the extension of a server that handles leaderboard data. Below is a summary of each component in the system.

### 1. Client

- **Technology**: HTML, CSS, and JavaScript
- **Description**: The client-side of the application was developed in the previous assignment (Assignment 2). It serves as the interface through which users can interact with the game and submit their scores to the leaderboard.

### 2. Server

- **Technology**: Express.js
- **Description**: The server is implemented using Node.js and Express.js. It acts as the middle layer between the client and the database. The server handles incoming requests, such as posting new scores to the leaderboard or retrieving the top scores.

### 3. Database

- **Technology**: MongoDB
- **Description**: MongoDB is used as the database for storing the leaderboard scores. It provides a scalable solution to store and query player scores efficiently.

---

## Microservices Architecture

The project is composed of three microservices:

1. **Client**: The frontend developed in Assignment 2, responsible for interacting with users.
2. **Server**: Handles the business logic, including the communication between the client and the database.
3. **Database**: A MongoDB database that stores the leaderboard information.

These microservices work together to create a seamless flow of data between the game interface and the persistent storage of player scores.

---

## How to Run the Project
1. **Clone the repository**:
   ```bash
   git clone https://github.com/adityak-21/breakout-game.git
    ```
2. **Deploying Frontend**:
    ```bash
    cd client 
    npm install
    ##Now you can open html in live server
    ```
3. **Backend**:
    ```bash
    cd server
    npm install
    node server.js
    ```    
    
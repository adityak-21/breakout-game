## Project Links

- [Github Repository](https://github.com/adityak-21/breakout-game)
- [Deployed Website](https://adityak-21.github.io/breakout-game/client/)
- [Architecture Diagram](./Untitled%201.jpg)
- [Integration Test Coverage](https://adityak-21.github.io/breakout-game/server/coverage/lcov-report/)
- [Frontend Test Coverage](https://kartik-r-soni.github.io/breakout-game-code-coverage/)

---
# README

## Implementation of Task 1

### Performance Test for Client-Side Rendering
- **Objective**: Measure and validate the performance metrics for client-side rendering. The results are logged daily and checked against predefined thresholds.
  
#### Code Implementation:
- **Location**: `./client/test/performance.test.js`
- **Node Packages Used**:
  - `selenium-webdriver`: For browser automation and performance measurement.

#### CI Pipeline:
- **Location**: `./github/workflows/validate-client-results.yml`
- **Functionality**:
  - Scheduled daily execution of performance tests using GitHub Actions.
  - Validates parameters such as load time, DOM content loaded time, asset duration, memory usage, and time to interactive from the `./output-client.log` file.
  - Raises errors if thresholds are exceeded, ensuring performance stays within acceptable limits.

#### Test Logs:
- **Output File**: `./output-client.log`
- Contains daily logs of performance metrics such as total load time, DOM content loaded time, and resource impact on load duration.


### Performance Test for Server-Side API
- **Objective**: Measure and validate the performance metrics for server-side API operations. The results are logged daily and checked against predefined thresholds.

#### Code Implementation:
- **Location**: `./server/test/performance.test.js`
- **Node Packages Used**:
  - `k6`: For load testing of the server-side API endpoints.

#### CI Pipeline:
- **Location**: `./github/workflows/validate-server-metrics.yml`
- **Functionality**:
  - Scheduled daily execution of performance tests using GitHub Actions.
  - Validates metrics such as HTTP request duration, iteration duration, data received, TLS handshaking time, and request status codes from the `./output-server.log` file.
  - Flags errors if thresholds are exceeded or critical parameters like POST and GET status codes are not met.

#### Test Logs:
- **Output File**: `./output-server.log`
- Contains daily logs of performance metrics such as HTTP request duration, iteration duration, and TLS handshaking time.


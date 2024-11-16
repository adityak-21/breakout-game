import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, 
  duration: '20s', 
};

export default function () {
  let payload = JSON.stringify({
    "name": "Abcd",
    "score": 13,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let postRes = http.post('https://backend-1-cr8v.onrender.com/api/leaderboard', payload, params);
  check(postRes, {
    'POST status is 201': (r) => r.status === 201,
  });

  let getRes = http.get('https://backend-1-cr8v.onrender.com/lead');
  check(getRes, {
    'GET status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

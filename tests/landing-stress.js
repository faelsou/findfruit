// landing-stress.js
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // rampa inicial
    { duration: '1m', target: 100 },  // pico
    { duration: '30s', target: 0 },   // queda
  ],
};

export default function () {
  let res = http.get('https://findfruit.com.br/');
  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}

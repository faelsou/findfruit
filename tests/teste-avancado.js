import http from 'k6/http';
// --- CORREÇÃO APLICADA AQUI ---
import { check, sleep, group } from 'k6'; 
import { Trend } from 'k6/metrics';

// --- Métricas Customizadas (Trends) ---
const http_req_duration_2xx = new Trend('http_req_duration_2xx', true);
const http_req_duration_3xx = new Trend('http_req_duration_3xx', true);
const http_req_duration_4xx = new Trend('http_req_duration_4xx', true);
const http_req_duration_5xx = new Trend('http_req_duration_5xx', true);

// --- Opções de Configuração do Teste ---
export const options = {
  scenarios: {
    carga_constante: {
      executor: 'constant-vus',
      vus: 15,
      duration: '1m',
      exec: 'runTests',
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<800'],
    'http_req_duration': ['p(99)<1500'],
    'http_req_failed': ['rate<0.01'],
    'http_req_duration_4xx': ['max<0'],
    'http_req_duration_5xx': ['max<0'],
  },
};

// --- Função Principal de Teste ---
export function runTests() {
  group('Cenário: Landing Page', function () {
    const res = http.get('https://findfruit.com.br');
    checkAndRecord(res);
  });

  sleep(1); 

  group('Cenário: Webhook', function () {
    const url = 'https://n8n.aiagentautomate.com.br/webhook/find-fruit';
    const payload = JSON.stringify({
      name: 'Teste K6 Avançado',
      message: 'Esta é uma mensagem de teste de performance.',
    });
    const params = { headers: { 'Content-Type': 'application/json' } };

    const res = http.post(url, payload, params);
    checkAndRecord(res);
  });

  sleep(1);
}

// --- Função Auxiliar para Checar e Registrar Métricas ---
function checkAndRecord(res) {
  check(res, { 'status é 200': (r) => r.status === 200 });

  if (res.status >= 200 && res.status < 300) {
    http_req_duration_2xx.add(res.timings.duration);
  } else if (res.status >= 300 && res.status < 400) {
    http_req_duration_3xx.add(res.timings.duration);
  } else if (res.status >= 400 && res.status < 500) {
    http_req_duration_4xx.add(res.timings.duration);
  } else if (res.status >= 500 && res.status < 600) {
    http_req_duration_5xx.add(res.timings.duration);
  }
}
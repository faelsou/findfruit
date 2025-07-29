// Arquivo: teste-findfruit.js

import http from 'k6/http';
import { check, sleep } from 'k6';

// Opções de configuração do teste
export const options = {
  // (Adicionado) Bloco de extensão para metadados do teste.
  // Ajuda a nomear e organizar seus testes no Grafana/k6 Cloud.
  ext: {
    loadimpact: {
      projectID: 3669641, // Você pode remover esta linha se não usar k6 Cloud
      // O nome do teste que aparecerá no seu dashboard.
      name: 'FindFruit - Performance e Stress Test'
    }
  },

  // Cenários de teste. Os nomes 'landing_page' e 'webhook' aparecerão no Grafana.
  scenarios: {
    landing_page: {
      executor: 'constant-vus', // Mantém um número constante de usuários virtuais
      vus: 10,                 // 10 usuários virtuais simultâneos
      duration: '1m',          // Duração do teste para este cenário: 1 minuto
      exec: 'testLandingPage', // Função que este cenário vai executar
    },
    webhook: {
      executor: 'constant-vus', // Outro executor para o webhook
      vus: 5,                  // 5 usuários virtuais simultâneos
      duration: '1m',          // Duração do teste para este cenário: 1 minuto
      exec: 'testWebhook',     // Função que este cenário vai executar
    },
  },
  // Limites (thresholds) para o teste passar ou falhar
  thresholds: {
    'http_req_failed': ['rate<0.01'], // Menos de 1% de requisições falhando
    'http_req_duration{scenario:landing_page}': ['p(95)<500'], // 95% das reqs da landing page devem ser abaixo de 500ms
    'http_req_duration{scenario:webhook}': ['p(95)<800'], // 95% das reqs do webhook devem ser abaixo de 800ms
  },
};

// --- Funções de Teste ---

// Cenário 1: Testa a Landing Page
export function testLandingPage() {
  const res = http.get('https://findfruit.com.br');
  check(res, { 'Landing Page status 200': (r) => r.status == 200 });
  sleep(1); // Espera 1 segundo entre as requisições de um mesmo usuário
}

// Cenário 2: Testa o Webhook do n8n
export function testWebhook() {
  const url = 'https://n8n.aiagentautomate.com.br/webhook/find-fruit';
  
  // !!! IMPORTANTE: Substitua este payload pelo JSON REAL que seu webhook espera !!!
  const payload = JSON.stringify({
    name: 'Teste K6',
    email: 'aiagenteautomate@gmail.com',
    message: 'Esta é uma mensagem de teste de performance.',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  check(res, { 'Webhook status 200': (r) => r.status == 200 });
  sleep(1); // Espera 1 segundo
}
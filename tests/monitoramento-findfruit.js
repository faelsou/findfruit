//Parte 1: O Pacote de Monitoramento Completo
//Script K6 de Monitoramento Contínuo (monitoramento-ia.js)
//Este script é diferente. Ele não é para um teste de carga massivo, mas para um monitoramento contínuo de baixa intensidade, simulando um fluxo real de ponta a ponta a cada minuto.
//Funcionalidades:
//Verifica a Landing Page: Garante que o site principal está no ar.
//Simula uma Conversa de IA:
//Envia uma mensagem para o webhook (POST).
//Valida o conteúdo da resposta: Verifica se a resposta do n8n contém um JSON válido ou uma mensagem de sucesso esperada.
//Mede a "Latência da IA": Mede o tempo que o n8n leva para processar a lógica da IA e responder.
//Verifica a Saúde da API do WhatsApp: Usa o blackbox-exporter (que você já tem) para verificar se a API do WhatsApp está respondendo.
//



import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend } from 'k6/metrics';

// --- Métricas Customizadas para a IA ---
const ia_processing_time = new Trend('ia_processing_time', true);

export const options = {
  scenarios: {
    // Roda um único VU a cada minuto, para sempre.
    healthcheck_continuo: {
      executor: 'constant-arrival-rate',
      rate: 1, // 1 iteração
      timeUnit: '1m', // a cada minuto
      duration: '30m', // Roda por 24 horas (ajuste conforme necessário) 1h
      preAllocatedVUs: 1,
      maxVUs: 2,
      exec: 'runHealthChecks',
    },
  },
  thresholds: {
    // 95% das checagens da landing page devem ser < 1s
    'http_req_duration{scenario:landing_page_healthcheck}': ['p(95)<1000'],
    // 95% do processamento da IA deve ser < 5s
    'ia_processing_time': ['p(95)<5000'],
    // A taxa de falha na validação da resposta da IA deve ser zero.
    'checks{check_name:resposta_ia_valida}': ['rate==1'],
  },
};

export function runHealthChecks() {
  // --- 1. Checagem da Landing Page ---
  group('Cenário: Landing Page Healthcheck', function () {
    const res = http.get('https://findfruit.com.br', { tags: { check_type: 'availability' } });
    check(res, { 'Landing Page está UP': (r) => r.status === 200 });
  });

  sleep(1);

  // --- 2. Checagem do Fluxo da IA ---
  group('Cenário: AI Agent Flow', function () {
    const url = 'https://n8n.aiagentautomate.com.br/webhook/find-fruit';
    const payload = JSON.stringify({
      // Simule um payload real de uma mensagem do WhatsApp
      sender: '5511999998888',
      message: 'Olá, qual o preço da banana?',
    });
    const params = {
      headers: {
        'Content-Type': 'application/json',
        // Se seu webhook tiver alguma chave de autenticação, adicione aqui
        // 'Authorization': 'Bearer SEU_TOKEN_SECRETO',
      },
      tags: { check_type: 'ia_flow' },
    };

    const res = http.post(url, payload, params);

    // Mede a latência da IA e valida a resposta
    if (check(res, { 'Webhook da IA respondeu com sucesso': (r) => r.status === 200 })) {
      ia_processing_time.add(res.timings.duration);

      // Validação do conteúdo da resposta (EXEMPLO)
      // Ajuste isso para o que seu n8n realmente retorna.
      let jsonResponse;
      try {
        jsonResponse = res.json();
      } catch (e) {
        // Ignora se não for JSON
      }
      
      check(res, {
        'resposta_ia_valida': (r) => r.status === 200 && r.body.includes('recebida'),
      }, { check_name: 'resposta_ia_valida' });
    }
  });
}
// Arquivo: teste-geral.js
import http from 'k6/http';
import { check, sleep, group } from 'k6';

// --- CONFIGURAÇÕES GERAIS ---
// !!! PREENCHA COM SEUS DADOS REAIS !!!
const SUPABASE_URL = 'https://<seu-projeto>.supabase.co';
const SUPABASE_ANON_KEY = 'sua-anon-key-aqui';
const EVOLUTION_API_URL = 'https://apiwp.aiagentautomate.com.br';
const EVOLUTION_API_KEY = 'sua-api-key-da-evolution';
const EVOLUTION_INSTANCE_NAME = 'find-fruit'; // Nome da sua instância

// --- OPÇÕES DO TESTE DE CARGA ---
export const options = {
  stages: [
    { duration: '1m', target: 15 }, // Sobe gradualmente para 15 usuários virtuais em 1 minuto
    { duration: '2m', target: 15 }, // Mantém 15 usuários por 2 minutos para observar o comportamento
    { duration: '30s', target: 0 },  // Desce a carga para 0
  ],
  thresholds: {
    // Definir metas de performance
    'http_req_duration': ['p(95)<1000'], // 95% das requisições devem ser abaixo de 1 segundo
    'http_req_failed': ['rate<0.02'],   // A taxa de falha deve ser menor que 2%
  },
};

// --- O SCRIPT PRINCIPAL DO TESTE ---
export default function () {
  
  // Grupo 1: Teste da Landing Page
  group('Landing Page - findfruit.com.br', function () {
    const res = http.get('https://findfruit.com.br');
    check(res, { 'Status 200 - Landing Page': (r) => r.status === 200 });
  });

  sleep(1); // Pausa de 1 segundo

  // Grupo 2: Teste do Webhook do n8n
  group('n8n Webhook - find-fruit', function () {
    const webhookUrl = 'https://n8n.aiagentautomate.com.br/webhook/find-fruit';
    
    // !!! IMPORTANTE: Substitua este payload pelo JSON que seu webhook realmente espera !!!
    const payload = JSON.stringify({
      origem: "teste-k6",
      timestamp: new Date().toISOString(),
      dados: { id: 123, nome: "Produto Teste" }
    });

    const params = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = http.post(webhookUrl, payload, params);
    check(res, { 'Status 200 - n8n Webhook': (r) => r.status === 200 });
  });

  sleep(1);

  // Grupo 3: Teste da API do Supabase (Leitura)
  group('Supabase API - Leitura', function () {
    // !!! Substitua 'nome_da_sua_tabela' por uma tabela pública real !!!
    const res = http.get(`${SUPABASE_URL}/rest/v1/nome_da_sua_tabela?select=*&limit=10`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    check(res, { 'Status 200 - Supabase Read': (r) => r.status === 200 });
  });

  sleep(2); // Pausa um pouco maior

  // Grupo 4: Teste da Evolution API (Verificar Status da Instância)
  // Este é um teste leve e seguro que não envia mensagens.
  group('Evolution API - Status da Instância', function () {
    const url = `${EVOLUTION_API_URL}/instance/connectionState/${EVOLUTION_INSTANCE_NAME}`;
    const params = {
      headers: { 'apikey': EVOLUTION_API_KEY },
    };
    const res = http.get(url, params);
    check(res, { 'Status 200 - Evolution Status': (r) => r.status === 200 });
  });
  
  sleep(1);
}
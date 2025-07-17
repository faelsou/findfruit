// webhook-test.js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50, // usuários virtuais simultâneos
  duration: '1m',
};

export default function () {
  const payload = JSON.stringify({
    nome: "Teste",
    telefone: "11945237617",
    imagem: "https://fruta.com/manga.jpg"
  });

  const headers = { 'Content-Type': 'application/json' };
  http.post('https://n8n.aiagentautomate.com.br/webhook/find-fruit', payload, { headers });
  sleep(1);
}

// evolution-stress.js
import http from 'k6/http';

export const options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    phone: "5511999999999",
    message: "Teste de performance",
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer DC3D2990281D-4252-AD6B-F694262DA012' // insira seu token real
  };

  http.post('https://apiwp.aiagentautomate.com.br/send', payload, { headers });
}

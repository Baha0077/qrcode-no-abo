interface Env {
  COUNTER: KVNamespace;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    // Stats API: GET /api/stats - get all stats
    if (url.pathname === '/api/stats' && request.method === 'GET') {
      const [qrCount, visitors] = await Promise.all([
        env.COUNTER.get('total'),
        env.COUNTER.get('visitors'),
      ]);
      return new Response(JSON.stringify({
        qrCodes: parseInt(qrCount || '0', 10),
        visitors: parseInt(visitors || '0', 10),
      }), { headers });
    }

    // Counter API: GET /api/counter - get QR count
    if (url.pathname === '/api/counter' && request.method === 'GET') {
      const count = await env.COUNTER.get('total') || '0';
      return new Response(JSON.stringify({ count: parseInt(count, 10) }), { headers });
    }

    // Counter API: POST /api/counter - increment QR count
    if (url.pathname === '/api/counter' && request.method === 'POST') {
      const current = parseInt(await env.COUNTER.get('total') || '0', 10);
      const next = current + 1;
      await env.COUNTER.put('total', String(next));
      return new Response(JSON.stringify({ count: next }), { headers });
    }

    // Visitor API: POST /api/visitor - increment visitor count (called once per session)
    if (url.pathname === '/api/visitor' && request.method === 'POST') {
      const current = parseInt(await env.COUNTER.get('visitors') || '0', 10);
      const next = current + 1;
      await env.COUNTER.put('visitors', String(next));
      return new Response(JSON.stringify({ count: next }), { headers });
    }

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Serve static assets for everything else
    return env.ASSETS.fetch(request);
  },
};

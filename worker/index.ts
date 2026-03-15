interface Env {
  COUNTER: KVNamespace;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Counter API: GET /api/counter - get count
    if (url.pathname === '/api/counter' && request.method === 'GET') {
      const count = await env.COUNTER.get('total') || '0';
      return new Response(JSON.stringify({ count: parseInt(count, 10) }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // Counter API: POST /api/counter - increment
    if (url.pathname === '/api/counter' && request.method === 'POST') {
      const current = parseInt(await env.COUNTER.get('total') || '0', 10);
      const next = current + 1;
      await env.COUNTER.put('total', String(next));
      return new Response(JSON.stringify({ count: next }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
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

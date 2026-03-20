export default {
  async fetch(request: Request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }

    const url = new URL(request.url);

    const target =
      "https://pub-3e305f428cc44fd7ab4903f3ad22cec6.r2.dev" + url.pathname;

    const response = await fetch(target, {
      headers: {
        // 🔥 elimina referer problemático
        Origin: "",
      },
    });

    const newHeaders = new Headers(response.headers);

    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    newHeaders.set("Access-Control-Allow-Headers", "*");
    newHeaders.set("Accept-Ranges", "bytes");

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  },
};

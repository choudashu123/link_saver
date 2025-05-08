export async function fetchMetadata(url: string) {
    const res = await fetch(url);
    const html = await res.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const ogImage = html.match(/<meta property="og:image" content="(.*?)"/);
    return {
      title: titleMatch?.[1] || url,
      favicon: new URL('/favicon.ico', url).href,
      summary: ogImage?.[1] || 'No summary available',
    };
  }
  
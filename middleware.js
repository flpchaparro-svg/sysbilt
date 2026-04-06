export const config = {
    // Execute middleware on all routes
    matcher: '/(.*)',
  };
  
  export default async function middleware(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
    // Standard list of search engine crawlers and social media bots
    const botIdentifiers = [
      'googlebot', 'bingbot', 'yandex', 'baiduspider', 'twitterbot', 
      'facebookexternalhit', 'rogerbot', 'linkedinbot', 'embedly', 
      'quora link preview', 'showyoubot', 'outbrain', 'pinterest', 
      'slackbot', 'vkshare', 'w3c_validator', 'whatsapp'
    ];
  
    const isBot = botIdentifiers.some(bot => userAgent.includes(bot));
    
    // Do not route static asset requests to Prerender
    const isStaticFile = /\.(css|js|gif|jpg|jpeg|png|ico|svg|woff|woff2|ttf|eot)$/i.test(url.pathname);
  
    if (isBot && !isStaticFile) {
      const prerenderUrl = `https://service.prerender.io/${request.url}`;
      
      try {
        const prerenderResponse = await fetch(prerenderUrl, {
          headers: {
            'X-Prerender-Token': process.env.PRERENDER_TOKEN || '',
          },
        });
  
        if (prerenderResponse.ok) {
          // Return the prerendered HTML directly to the bot
          return prerenderResponse;
        }
      } catch (error) {
        console.error('Prerender request failed:', error);
      }
    }
  
    // If not a bot, or if Prerender fails, Vercel continues normal routing to your Vite app
  }
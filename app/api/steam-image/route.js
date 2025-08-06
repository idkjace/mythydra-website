export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get('appId');
  
  if (!appId) {
    return new Response('App ID is required', { status: 400 });
  }

  try {
    // Following the Steam Web API pattern from the GitHub issue:
    // https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/{appid}/{img_icon_url}.jpg
    // Since we don't have the img_icon_url, we'll try the direct icon pattern first
    
    // Try Steam header images first (these are larger, more prominent images)
    const steamImageUrls = [
      // Header images (better for display)
      `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
      `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`,
      `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`,
      `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
      // Icon images as fallback
      `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${appId}/icon.jpg`,
      `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${appId}/icon.jpg`,
      `https://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/${appId}/icon.jpg`,
    ];

    for (const url of steamImageUrls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const imageBuffer = await response.arrayBuffer();
          return new Response(imageBuffer, {
            headers: {
              'Content-Type': response.headers.get('content-type') || 'image/jpeg',
              'Cache-Control': 'public, max-age=86400',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
        continue;
      }
    }

    // If all direct URLs fail, try to get the correct icon URL from Steam API
    try {
      const steamApiUrl = `https://store.steampowered.com/api/appdetails?appids=${appId}&l=english`;
      const apiResponse = await fetch(steamApiUrl);
      
      if (apiResponse.ok) {
        const apiData = await apiResponse.json();
        if (apiData[appId] && apiData[appId].success && apiData[appId].data) {
          const appData = apiData[appId].data;
          
          if (appData.header_image) {
            const imageResponse = await fetch(appData.header_image);
            if (imageResponse.ok) {
              const imageBuffer = await imageResponse.arrayBuffer();
              return new Response(imageBuffer, {
                headers: {
                  'Content-Type': 'image/jpeg',
                  'Cache-Control': 'public, max-age=86400',
                  'Access-Control-Allow-Origin': '*',
                },
              });
            }
          }
        }
      }
    } catch (apiError) {
      console.error('Failed to fetch from Steam API:', apiError);
    }

    return new Response('Image not found', { status: 404 });
  } catch (error) {
    console.error('Error fetching Steam image:', error);
    return new Response('Error fetching image', { status: 500 });
  }
}

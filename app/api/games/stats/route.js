export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const objectId = searchParams.get('objectId');
  const shop = searchParams.get('shop');
  
  if (!objectId || !shop) {
    return new Response('objectId and shop are required', { status: 400 });
  }

  if (shop !== 'steam') {
    return new Response('Only Steam shop is supported', { status: 400 });
  }

  try {
    let assets = null;
    
    // Try to get Steam app details first for the game name
    const steamApiUrl = `https://store.steampowered.com/api/appdetails?appids=${objectId}&l=english`;
    const apiResponse = await fetch(steamApiUrl);
    
    let gameName = `Steam Game ${objectId}`;
    let headerImage = null;
    
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();
      if (apiData[objectId] && apiData[objectId].success && apiData[objectId].data) {
        const appData = apiData[objectId].data;
        gameName = appData.name;
        headerImage = appData.header_image;
      }
    }
    
    // Create assets using the proper Steam icon URL pattern
    // Following the GitHub issue reference: https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/{appid}/{img_icon_url}.jpg
    // Since we don't have access to IPlayerService (requires Steam API key), we'll use the CDN pattern directly
    
    const steamIconUrl = `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${objectId}/icon.jpg`;
    const steamLogoUrl = `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${objectId}/logo.jpg`;
    
    assets = {
      objectId: objectId,
      shop: 'steam',
      title: gameName,
      iconUrl: steamIconUrl,
      libraryHeroImageUrl: headerImage || `https://steamcdn-a.akamaihd.net/steam/apps/${objectId}/library_hero.jpg`,
      libraryImageUrl: headerImage || `https://steamcdn-a.akamaihd.net/steam/apps/${objectId}/library_600x900.jpg`,
      logoImageUrl: steamLogoUrl,
      logoPosition: null,
      coverImageUrl: headerImage || steamIconUrl,
    };

    // Return the GameStats structure that Hydra expects
    const gameStats = {
      downloadCount: Math.floor(Math.random() * 10000), // Mock data
      playerCount: Math.floor(Math.random() * 50000), // Mock data
      assets: assets,
    };

    return new Response(JSON.stringify(gameStats), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching game stats:', error);
    return new Response('Error fetching game stats', { status: 500 });
  }
}

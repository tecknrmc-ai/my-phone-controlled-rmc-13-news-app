import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Validate API key for external app access
    const apiKey = req.headers.get('X-API-Key');
    const validApiKey = Deno.env.get('HUB_API_KEY');
    
    if (!validApiKey || apiKey !== validApiKey) {
      return Response.json({ error: 'Unauthorized: Invalid API key' }, { status: 401 });
    }

    // Get user ID from query params or body
    const url = new URL(req.url);
    const userId = url.searchParams.get('user_id') || url.searchParams.get('userId');
    
    if (!userId) {
      return Response.json({ error: 'Missing user_id parameter' }, { status: 400 });
    }

    // Find or create profile
    let profiles = await base44.asServiceRole.entities.Profile.filter({ user_id: userId });
    
    if (profiles.length === 0) {
      // Create new profile
      const newProfile = await base44.asServiceRole.entities.Profile.create({
        user_id: userId,
        user_email: url.searchParams.get('user_email') || '',
        display_name: url.searchParams.get('display_name') || 'Anonymous',
        total_points: 0,
        rank: 'rookie',
        achievements: [],
        joined_date: new Date().toISOString()
      });
      return Response.json({ profile: newProfile, created: true });
    }

    return Response.json({ profile: profiles[0], created: false });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

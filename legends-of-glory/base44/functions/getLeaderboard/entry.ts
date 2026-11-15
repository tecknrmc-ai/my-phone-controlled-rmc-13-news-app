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

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    // Get all profiles sorted by total_points descending
    const profiles = await base44.asServiceRole.entities.Profile.list('-total_points', limit + offset);
    
    // Slice to get the correct page
    const paginatedProfiles = profiles.slice(offset, offset + limit);
    
    // Format for response
    const leaderboard = paginatedProfiles.map((profile, index) => ({
      rank: index + 1 + offset,
      user_id: profile.user_id,
      display_name: profile.display_name,
      total_points: profile.total_points,
      rank_tier: profile.rank,
      achievements: profile.achievements || []
    }));

    return Response.json({ 
      leaderboard,
      total_count: profiles.length,
      limit,
      offset
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

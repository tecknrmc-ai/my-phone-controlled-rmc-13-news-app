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

    // Parse request body
    const body = await req.json();
    const { user_id, user_email, points, source_app, activity_type, user_name } = body;

    if (!user_id || typeof points !== 'number') {
      return Response.json({ error: 'Missing required fields: user_id and points' }, { status: 400 });
    }

    // Record the points transaction
    await base44.asServiceRole.entities.Points.create({
      user_id,
      user_email: user_email || '',
      user_name: user_name || '',
      points,
      source_app: source_app || 'unknown',
      activity_type: activity_type || 'general'
    });

    // Update or create profile with aggregated points
    let profiles = await base44.asServiceRole.entities.Profile.filter({ user_id });
    
    let profile;
    if (profiles.length === 0) {
      profile = await base44.asServiceRole.entities.Profile.create({
        user_id,
        user_email: user_email || '',
        display_name: user_name || 'Anonymous',
        total_points: points,
        rank: calculateRank(points),
        achievements: [],
        joined_date: new Date().toISOString()
      });
    } else {
      const currentPoints = profiles[0].total_points || 0;
      const newTotal = currentPoints + points;
      
      profile = await base44.asServiceRole.entities.Profile.update(profiles[0].id, {
        total_points: newTotal,
        rank: calculateRank(newTotal),
        display_name: user_name || profiles[0].display_name
      });
    }

    return Response.json({ 
      success: true, 
      points_added: points,
      new_total: profile.total_points,
      rank: profile.rank,
      profile 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function calculateRank(totalPoints) {
  if (totalPoints >= 10000) return 'legend';
  if (totalPoints >= 5000) return 'elite';
  if (totalPoints >= 2500) return 'pro';
  if (totalPoints >= 1000) return 'advanced';
  if (totalPoints >= 500) return 'intermediate';
  if (totalPoints >= 100) return 'novice';
  return 'rookie';
}

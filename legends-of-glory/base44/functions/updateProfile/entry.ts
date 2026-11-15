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
    const { user_id, display_name, avatar_url, achievement } = body;

    if (!user_id) {
      return Response.json({ error: 'Missing required field: user_id' }, { status: 400 });
    }

    // Find profile
    let profiles = await base44.asServiceRole.entities.Profile.filter({ user_id });
    
    let profile;
    if (profiles.length === 0) {
      // Create new profile
      profile = await base44.asServiceRole.entities.Profile.create({
        user_id,
        user_email: body.user_email || '',
        display_name: display_name || 'Anonymous',
        avatar_url: avatar_url || '',
        total_points: 0,
        rank: 'rookie',
        achievements: achievement ? [achievement] : [],
        joined_date: new Date().toISOString()
      });
    } else {
      // Update existing profile
      const updateData = {};
      if (display_name) updateData.display_name = display_name;
      if (avatar_url) updateData.avatar_url = avatar_url;
      if (achievement) {
        const currentAchievements = profiles[0].achievements || [];
        if (!currentAchievements.includes(achievement)) {
          updateData.achievements = [...currentAchievements, achievement];
        }
      }
      
      profile = await base44.asServiceRole.entities.Profile.update(profiles[0].id, updateData);
    }

    return Response.json({ success: true, profile });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
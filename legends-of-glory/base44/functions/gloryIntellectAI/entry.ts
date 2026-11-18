import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { message } = await req.json();
    if (!message) return Response.json({ error: 'Message required' }, { status: 400 });

    // Load knowledge base
    const knowledge = await base44.entities.KnowledgeBase.list();
    
    // Build context from knowledge base
    const contextItems = knowledge.filter(k => {
      const lowerMsg = message.toLowerCase();
      const matchKeywords = k.keywords?.some(kw => lowerMsg.includes(kw.toLowerCase()));
      const matchQuestion = lowerMsg.includes(k.question.toLowerCase());
      const matchAnswer = lowerMsg.includes(k.answer.toLowerCase().split(' ').slice(0, 5).join(' '));
      return matchKeywords || matchQuestion || matchAnswer;
    }).slice(0, 10);

    // Load artists and staff for context
    const artists = await base44.entities.Artist.list();
    const staff = await base44.entities.Staff.list();
    const trailers = await base44.entities.Trailer.list();

    // Build comprehensive context
    const context = `
Legends of Glory is a hip-hop battle cypher featuring 5 elite artists from Inland Empire and Los Angeles.

ARTISTS:
${artists.map(a => `- ${a.name}: ${a.bio || 'Elite battle rapper'}. Skills: ${a.skills?.join(', ') || 'Various'}. From: ${a.city || ''}${a.state ? ', ' + a.state : ''}. Rating: ${a.rating || 'N/A'}`).join('\n')}

STAFF:
${staff.map(s => `- ${s.name}: ${s.role}`).join('\n')}

EXECUTIVE PRODUCERS: Teckn, Nicole, Nee'Cole, & Cash Champ

PRODUCTION:
- Battle Cypher format: 5 artists compete
- Vote to determine the winner
- Marketing campaign goal: $100k
- Available on Spotify and Apple Music

TRAILERS: ${trailers.length} videos available

KNOWLEDGE BASE:
${contextItems.map(k => `Q: ${k.question}\nA: ${k.answer}`).join('\n\n')}

Answer the user's question about Legends of Glory based on this context. Be concise, engaging, and informative. If you don't know something, say you don't have that information yet.
`;

    // Call LLM with context
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are the Glory Intellect AI, an expert assistant for Legends of Glory - a hip-hop battle cypher featuring 5 elite artists from Inland Empire and LA.

${context}

User question: ${message}

Provide a helpful, engaging answer about Legends of Glory. Keep it concise (2-4 sentences max unless asking for detailed info). Use an energetic, hip-hop culture tone.`,
      add_context_from_internet: false,
      model: 'gpt_5_mini'
    });

    return Response.json({ answer: response });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

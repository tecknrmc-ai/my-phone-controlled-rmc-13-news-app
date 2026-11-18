import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ArtistCard from "./ArtistCard";
import { useToast } from "@/components/ui/use-toast";
import { Trophy, Loader2 } from "lucide-react";

function getFingerprint() {
  const nav = window.navigator;
  const raw = [nav.userAgent, nav.language, screen.width, screen.height, new Date().getTimezoneOffset()].join("|");
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash) + raw.charCodeAt(i);
    hash |= 0;
  }
  return String(Math.abs(hash));
}

export default function VoteSection() {
  const [artists, setArtists] = useState([]);
  const [votes, setVotes] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const fingerprint = getFingerprint();

  const loadData = useCallback(async () => {
    const [artistData, voteData] = await Promise.all([
      base44.entities.Artist.list("order", 50),
      base44.entities.Vote.list("-created_date", 5000),
    ]);
    setArtists(artistData);
    setVotes(voteData);
    setHasVoted(voteData.some((v) => v.voter_fingerprint === fingerprint));
    setLoading(false);
  }, [fingerprint]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleVote = async (artist) => {
    if (hasVoted) return;
    await base44.entities.Vote.create({
      artist_id: artist.id,
      artist_name: artist.name,
      voter_fingerprint: fingerprint,
    });
    setHasVoted(true);
    toast({
      title: "Vote Cast! 🔥",
      description: `You voted for ${artist.name}`,
    });
    loadData();
  };

  const getVoteCount = (artistId) => votes.filter((v) => v.artist_id === artistId).length;

  const totalVotes = votes.length;

  const sortedArtists = [...artists].sort(
    (a, b) => getVoteCount(b.id) - getVoteCount(a.id)
  );
  const leaderId = sortedArtists.length > 0 ? sortedArtists[0].id : null;

  if (loading) {
    return (
      <section id="vote" className="py-20 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section id="vote" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="text-primary font-heading tracking-[0.3em] text-xs uppercase mb-2">
            Cast Your Vote
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Who Won The Cypher?
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md mx-auto">
            Pick the artist who killed it the hardest. One vote per fan.
          </p>
        </motion.div>

        {/* Total Votes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          <Trophy className="w-4 h-4 text-primary" />
          <span className="text-sm font-heading uppercase tracking-wider text-muted-foreground">
            {totalVotes} Total Votes
          </span>
        </motion.div>

        {/* Artist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, i) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              rank={i}
              voteCount={getVoteCount(artist.id)}
              totalVotes={totalVotes}
              onVote={handleVote}
              hasVoted={hasVoted}
              isLeader={artist.id === leaderId && totalVotes > 0}
            />
          ))}
        </div>

        {hasVoted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground text-xs mt-8 font-heading uppercase tracking-wider"
          >
            Your vote has been recorded. Share the cypher! 🔥
          </motion.p>
        )}
      </div>
    </section>
  );
}

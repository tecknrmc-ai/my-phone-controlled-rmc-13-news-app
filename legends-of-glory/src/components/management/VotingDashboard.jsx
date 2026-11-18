import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { Trophy, TrendingUp, Users, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function VotingDashboard() {
  const [artists, setArtists] = useState([]);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [artistData, voteData] = await Promise.all([
        base44.entities.Artist.list("order", 50),
        base44.entities.Vote.list("-created_date", 5000),
      ]);
      setArtists(artistData);
      setVotes(voteData);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // Total votes per artist
  const artistVoteCounts = artists.map((a) => ({
    name: a.name,
    votes: votes.filter((v) => v.artist_id === a.id).length,
  })).sort((a, b) => b.votes - a.votes);

  const totalVotes = votes.length;

  // Daily trend — last 7 days
  const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const dailyTrend = days.map((day) => {
    const label = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const dayVotes = votes.filter((v) => {
      const vd = new Date(v.created_date);
      return vd.getFullYear() === day.getFullYear() &&
        vd.getMonth() === day.getMonth() &&
        vd.getDate() === day.getDate();
    });

    const entry = { date: label };
    artists.forEach((a) => {
      entry[a.name] = dayVotes.filter((v) => v.artist_id === a.id).length;
    });
    entry.total = dayVotes.length;
    return entry;
  });

  const COLORS = ["#D4A017", "#F5D060", "#A07800", "#e8c54a", "#8a6200"];

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-4 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-xs font-heading uppercase tracking-wider text-muted-foreground">Total Votes</span>
            </div>
            <p className="font-display text-3xl font-bold text-primary">{totalVotes}</p>
          </CardContent>
        </Card>
        {artistVoteCounts.slice(0, 3).map((a, i) => (
          <Card key={a.name} className="border-border">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className={`w-4 h-4 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-xs font-heading uppercase tracking-wider text-muted-foreground truncate">#{i + 1} {a.name}</span>
              </div>
              <p className={`font-display text-3xl font-bold ${i === 0 ? "text-primary" : "text-foreground"}`}>{a.votes}</p>
              <p className="text-xs text-muted-foreground">{totalVotes > 0 ? Math.round((a.votes / totalVotes) * 100) : 0}% of votes</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total votes bar chart */}
      <div>
        <h3 className="font-heading text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4" /> Total Votes Per Artist
        </h3>
        <div className="bg-card border border-border rounded-sm p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={artistVoteCounts} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11, fontFamily: "Oswald" }} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid rgba(212,160,23,0.3)", borderRadius: "4px" }}
                labelStyle={{ color: "#D4A017", fontFamily: "Oswald" }}
                itemStyle={{ color: "#eee" }}
              />
              <Bar dataKey="votes" fill="#D4A017" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily trend line chart */}
      <div>
        <h3 className="font-heading text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Daily Voting Trends (Last 7 Days)
        </h3>
        <div className="bg-card border border-border rounded-sm p-4">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyTrend} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="date" tick={{ fill: "#888", fontSize: 11, fontFamily: "Oswald" }} />
              <YAxis tick={{ fill: "#888", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid rgba(212,160,23,0.3)", borderRadius: "4px" }}
                labelStyle={{ color: "#D4A017", fontFamily: "Oswald" }}
                itemStyle={{ color: "#eee" }}
              />
              <Legend wrapperStyle={{ fontSize: "11px", fontFamily: "Oswald" }} />
              {artists.map((a, i) => (
                <Line
                  key={a.id}
                  type="monotone"
                  dataKey={a.name}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Artist vote table */}
      <div>
        <h3 className="font-heading text-sm uppercase tracking-widest text-primary mb-4">Leaderboard</h3>
        <div className="bg-card border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">Rank</th>
                <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">Artist</th>
                <th className="text-right px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">Votes</th>
                <th className="text-right px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">Share</th>
              </tr>
            </thead>
            <tbody>
              {artistVoteCounts.map((a, i) => (
                <tr key={a.name} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="px-4 py-3 font-heading text-primary font-bold">#{i + 1}</td>
                  <td className="px-4 py-3 font-heading uppercase tracking-wider">{a.name}</td>
                  <td className="px-4 py-3 text-right font-bold text-primary">{a.votes}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {totalVotes > 0 ? Math.round((a.votes / totalVotes) * 100) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

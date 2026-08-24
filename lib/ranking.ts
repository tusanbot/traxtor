export type RankingMetric = { id: string; label: string; suffix?: string; accent?: boolean };
export type RankingPlayer = { id: string; name: string; number?: string; image?: string; stats: Record<string,string|number> };
export type RankingConfig = { title: string; metric: string; players: RankingPlayer[]; descending?: boolean };

export const rankingMetrics: RankingMetric[] = [
  { id: "goals", label: "گل", suffix: "گل", accent: true },
  { id: "assists", label: "پاس گل", suffix: "پاس گل", accent: true },
  { id: "rating", label: "امتیاز", suffix: "امتیاز", accent: true },
  { id: "cleanSheets", label: "کلین‌شیت", suffix: "کلین‌شیت", accent: true },
  { id: "keyPasses", label: "پاس کلیدی", suffix: "پاس کلیدی", accent: true },
  { id: "games", label: "بازی", suffix: "بازی", accent: true },
];

export function rankingValue(player: RankingPlayer, metric: string): number {
  const value = player.stats[metric];
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function rankPlayers(players: RankingPlayer[], metric: string, descending = true): RankingPlayer[] {
  return [...players].sort((a,b) => {
    const diff = rankingValue(b, metric) - rankingValue(a, metric);
    return descending ? diff : -diff;
  });
}

export function getRankedPlayers(config: RankingConfig) {
  return rankPlayers(config.players, config.metric, config.descending ?? true);
}

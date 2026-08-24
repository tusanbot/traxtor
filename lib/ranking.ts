export type RankingMetric = { id: string; label: string; suffix?: string; accent?: boolean };
export type RankingPlayer = {
  id: string;
  name: string;
  team?: string;
  number?: string;
  image?: string;
  games?: string | number;
  goals?: string | number;
  assists?: string | number;
  rating?: string | number;
  cleanSheets?: string | number;
  stats: Record<string,string|number>;
};
export type RankingConfig<T extends RankingPlayer = RankingPlayer> = { title: string; metric: string; players: T[]; descending?: boolean };

export const rankingMetrics: RankingMetric[] = [
  { id: "goals", label: "گل", suffix: "گل", accent: true },
  { id: "assists", label: "پاس گل", suffix: "پاس گل", accent: true },
  { id: "rating", label: "امتیاز", suffix: "امتیاز", accent: true },
  { id: "cleanSheets", label: "کلین‌شیت", suffix: "کلین‌شیت", accent: true },
  { id: "keyPasses", label: "پاس کلیدی", suffix: "پاس کلیدی", accent: true },
  { id: "games", label: "بازی", suffix: "بازی", accent: true },
];

export function rankingValue(player: RankingPlayer, metric: string): number {
  const direct = player[metric as keyof RankingPlayer];
  const value = direct !== undefined && typeof direct !== "object" ? direct : player.stats[metric];
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function rankPlayers<T extends RankingPlayer>(players: T[], metric: string, descending = true): T[] {
  return [...players].sort((a,b) => {
    const diff = rankingValue(b, metric) - rankingValue(a, metric);
    return descending ? diff : -diff;
  });
}

export function getRankedPlayers<T extends RankingPlayer>(config: RankingConfig<T>): T[] {
  return rankPlayers(config.players, config.metric, config.descending ?? true);
}

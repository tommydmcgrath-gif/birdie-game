import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Player {
  id: string;
  name: string;
  created_at: string;
}

export interface PlayerHole {
  id: string;
  player_id: string;
  hole_number: number;
  completed_at: string;
  created_at: string;
}

export interface PlayerWithProgress extends Player {
  completed_holes: PlayerHole[];
  completed_count: number;
}

export async function fetchPlayers(): Promise<PlayerWithProgress[]> {
  const { data: players, error: pErr } = await supabase
    .from('players')
    .select('*')
    .order('created_at', { ascending: true });

  if (pErr) throw pErr;

  const { data: holes, error: hErr } = await supabase
    .from('player_holes')
    .select('*');

  if (hErr) throw hErr;

  const holesByPlayer = new Map<string, PlayerHole[]>();
  for (const h of holes ?? []) {
    const list = holesByPlayer.get(h.player_id) ?? [];
    list.push(h);
    holesByPlayer.set(h.player_id, list);
  }

  return (players ?? []).map((p) => {
    const completed = holesByPlayer.get(p.id) ?? [];
    return {
      ...p,
      completed_holes: completed,
      completed_count: completed.length,
    };
  });
}

export async function fetchPlayer(playerId: string): Promise<PlayerWithProgress | null> {
  const { data: player, error: pErr } = await supabase
    .from('players')
    .select('*')
    .eq('id', playerId)
    .single();

  if (pErr) return null;

  const { data: holes, error: hErr } = await supabase
    .from('player_holes')
    .select('*')
    .eq('player_id', playerId);

  if (hErr) throw hErr;

  return {
    ...player,
    completed_holes: holes ?? [],
    completed_count: (holes ?? []).length,
  };
}

export async function createPlayer(name: string): Promise<Player> {
  const { data, error } = await supabase
    .from('players')
    .insert({ name: name.trim() })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function completeHole(
  playerId: string,
  holeNumber: number,
  completedAt: string
): Promise<PlayerHole> {
  const { data, error } = await supabase
    .from('player_holes')
    .insert({
      player_id: playerId,
      hole_number: holeNumber,
      completed_at: completedAt,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateHoleDate(
  id: string,
  completedAt: string
): Promise<void> {
  const { error } = await supabase
    .from('player_holes')
    .update({ completed_at: completedAt })
    .eq('id', id);

  if (error) throw error;
}

export async function uncompleteHole(id: string): Promise<void> {
  const { error } = await supabase
    .from('player_holes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function fetchRecentPunches(limit = 10): Promise<
  (PlayerHole & { player_name: string })[]
> {
  const { data, error } = await supabase
    .from('player_holes')
    .select('*, players(name)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((d) => ({
    ...d,
    player_name: (d.players as unknown as { name: string })?.name ?? 'Unknown',
  }));
}

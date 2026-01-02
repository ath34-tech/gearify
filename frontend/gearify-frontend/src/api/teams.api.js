import { supabase } from "../lib/supabase";

/**
 * Fetch all teams in the current company
 */
export async function getTeams() {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Teams fetch failed:", error);
    throw error;
  }

  return data;
}

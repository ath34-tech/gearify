import { supabase } from "../lib/supabase";

/**
 * Fetch all equipment for the current company
 * (company filtering handled by RLS)
 */
export async function getEquipment() {
  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .order("created_at", { ascending: false });
    console.log("Fetched equipment:", data);

  if (error) {
    console.error("Equipment fetch failed:", error);
    throw error;
  }

  return data;
}

import { supabase } from "../lib/supabase";

export async function fetchDashboardRequests() {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select(`
      id,
      subject,
      category,
      status,
      priority,
      due_date,
      created_at,
      requested_by:users!maintenance_requests_requested_by_fkey(email),
      assigned_to:technicians!maintenance_requests_assigned_to_fkey(name, email),
      company:companies(name)
    `)
    .order("created_at", { ascending: false })
    .limit(5);
        console.log("Fetched maintenance requests:", data);
  if (error) {
    console.error("Dashboard fetch error:", error);
    throw error;
  }

  return data;
}

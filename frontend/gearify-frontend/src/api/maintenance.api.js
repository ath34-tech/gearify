import { supabase } from "../lib/supabase";

export async function fetchMaintenanceById(id) {
  const { data, error } = await supabase
    .from("maintenance_requests")
    .select(`
      id,
      subject,
      description,
      category,
      priority,
      status,
      due_date,
      equipment_id,
      assigned_to,
      equipment(name),
      technicians(id, name)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateMaintenance(id, updates) {
  const { error } = await supabase
    .from("maintenance_requests")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

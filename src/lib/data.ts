import { createClient } from "@/lib/supabase/client";

export async function getProfile() {
  const supabase = createClient();

  // 1. Get the current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // 2. Fetch their stats
  const { data: stats, error } = await supabase
    .from("character_stats")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching stats:", error);
    return null;
  }

  return stats;
}

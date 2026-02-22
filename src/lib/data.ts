import { createClient } from "@/lib/supabase/client";

export async function getProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch profile and character_stats in a single query
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      character_stats:character_stats!user_id(*) 
    `,
    )
    .eq("id", user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching data:", error);
    return null;
  }

  // Flatten the object so stats are directly accessible
  return {
    ...data,
    ...data.character_stats,
  };
}

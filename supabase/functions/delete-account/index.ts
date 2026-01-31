import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authorization header exists
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create client with user's token to validate
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify and get user claims
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabaseClient.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID not found in token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create admin client with service role for deletion operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Starting account deletion for user: ${userId}`);

    // Delete user data from all related tables
    // Order matters due to foreign key constraints

    // 1. Delete celebration_events
    const { error: celebrationError } = await supabaseAdmin
      .from("celebration_events")
      .delete()
      .eq("user_id", userId);
    if (celebrationError) {
      console.log("celebration_events deletion error:", celebrationError.message);
    }

    // 2. Delete chat_messages
    const { error: chatMessagesError } = await supabaseAdmin
      .from("chat_messages")
      .delete()
      .eq("user_id", userId);
    if (chatMessagesError) {
      console.log("chat_messages deletion error:", chatMessagesError.message);
    }

    // 3. Delete device_tokens
    const { error: deviceTokensError } = await supabaseAdmin
      .from("device_tokens")
      .delete()
      .eq("user_id", userId);
    if (deviceTokensError) {
      console.log("device_tokens deletion error:", deviceTokensError.message);
    }

    // 4. Delete goals
    const { error: goalsError } = await supabaseAdmin
      .from("goals")
      .delete()
      .eq("user_id", userId);
    if (goalsError) {
      console.log("goals deletion error:", goalsError.message);
    }

    // 5. Delete task_categories
    const { error: taskCategoriesError } = await supabaseAdmin
      .from("task_categories")
      .delete()
      .eq("user_id", userId);
    if (taskCategoriesError) {
      console.log("task_categories deletion error:", taskCategoriesError.message);
    }

    // 6. Delete task_events (actor_id)
    const { error: taskEventsActorError } = await supabaseAdmin
      .from("task_events")
      .delete()
      .eq("actor_id", userId);
    if (taskEventsActorError) {
      console.log("task_events (actor_id) deletion error:", taskEventsActorError.message);
    }

    // 7. Delete task_events (recipient_id)
    const { error: taskEventsRecipientError } = await supabaseAdmin
      .from("task_events")
      .delete()
      .eq("recipient_id", userId);
    if (taskEventsRecipientError) {
      console.log("task_events (recipient_id) deletion error:", taskEventsRecipientError.message);
    }

    // 8. Delete user_badges
    const { error: userBadgesError } = await supabaseAdmin
      .from("user_badges")
      .delete()
      .eq("user_id", userId);
    if (userBadgesError) {
      console.log("user_badges deletion error:", userBadgesError.message);
    }

    // 9. Delete user_character_images
    const { error: userCharacterImagesError } = await supabaseAdmin
      .from("user_character_images")
      .delete()
      .eq("user_id", userId);
    if (userCharacterImagesError) {
      console.log("user_character_images deletion error:", userCharacterImagesError.message);
    }

    // 10. Delete user_families
    const { error: userFamiliesError } = await supabaseAdmin
      .from("user_families")
      .delete()
      .eq("user_id", userId);
    if (userFamiliesError) {
      console.log("user_families deletion error:", userFamiliesError.message);
    }

    // 11. Delete user_fcm_tokens
    const { error: userFcmTokensError } = await supabaseAdmin
      .from("user_fcm_tokens")
      .delete()
      .eq("user_id", userId);
    if (userFcmTokensError) {
      console.log("user_fcm_tokens deletion error:", userFcmTokensError.message);
    }

    // 12. Delete files from character-images bucket (avatars/<user_id>-*)
    try {
      const { data: files, error: listError } = await supabaseAdmin.storage
        .from("character-images")
        .list("avatars", {
          search: `${userId}-`,
        });

      if (listError) {
        console.log("Storage list error:", listError.message);
      } else if (files && files.length > 0) {
        const filePaths = files.map((file) => `avatars/${file.name}`);
        const { error: removeError } = await supabaseAdmin.storage
          .from("character-images")
          .remove(filePaths);
        if (removeError) {
          console.log("Storage remove error:", removeError.message);
        } else {
          console.log(`Deleted ${files.length} file(s) from storage`);
        }
      }
    } catch (storageErr) {
      console.log("Storage deletion error:", storageErr);
    }

    // 13. Delete user profile (primary key is user's auth id)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId);
    if (profileError) {
      console.log("profiles deletion error:", profileError.message);
    }

    // 7. Finally, delete the auth user
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    
    if (authError) {
      console.error("Auth user deletion error:", authError);
      return new Response(
        JSON.stringify({ error: "Failed to delete authentication account" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully deleted account for user: ${userId}`);

    return new Response(
      JSON.stringify({ success: true, message: "Account and all data deleted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

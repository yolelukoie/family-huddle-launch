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
    // The order matters due to foreign key constraints
    // Adjust these table names based on your actual schema

    // 1. Delete chat messages
    const { error: messagesError } = await supabaseAdmin
      .from("messages")
      .delete()
      .eq("user_id", userId);
    
    if (messagesError) {
      console.log("Messages deletion error (table may not exist):", messagesError.message);
    }

    // 2. Delete tasks
    const { error: tasksError } = await supabaseAdmin
      .from("tasks")
      .delete()
      .eq("user_id", userId);
    
    if (tasksError) {
      console.log("Tasks deletion error (table may not exist):", tasksError.message);
    }

    // 3. Delete goals
    const { error: goalsError } = await supabaseAdmin
      .from("goals")
      .delete()
      .eq("user_id", userId);
    
    if (goalsError) {
      console.log("Goals deletion error (table may not exist):", goalsError.message);
    }

    // 4. Delete huddle memberships
    const { error: membershipsError } = await supabaseAdmin
      .from("huddle_members")
      .delete()
      .eq("user_id", userId);
    
    if (membershipsError) {
      console.log("Huddle memberships deletion error (table may not exist):", membershipsError.message);
    }

    // 5. Delete notification settings
    const { error: notificationsError } = await supabaseAdmin
      .from("notification_settings")
      .delete()
      .eq("user_id", userId);
    
    if (notificationsError) {
      console.log("Notification settings deletion error (table may not exist):", notificationsError.message);
    }

    // 6. Delete user profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId);
    
    if (profileError) {
      console.log("Profile deletion error (table may not exist):", profileError.message);
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

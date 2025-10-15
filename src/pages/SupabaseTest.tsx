import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SupabaseTest() {
  const [status, setStatus] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      try {
        // Try to fetch the current user (should be null if not logged in, but will error if keys are wrong)
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          setStatus(`Error: ${error.message}`);
        } else {
          setStatus("Supabase connection successful!");
        }
      } catch (err) {
        setStatus(`Error: ${err}`);
      }
    }
    testConnection();
  }, []);

  return (
    <div style={{ padding: 32, fontSize: 24 }}>
      <strong>Supabase Test:</strong> {status}
    </div>
  );
}

"use client";

import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function AuthButtonClient( { session }: { session: Session | null } ) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
          provider: "github",
          options: { redirectTo: "http://localhost:3000/auth/callback" 

          }
      });
    }
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

  return session ? (
    <button onClick={handleSignIn}>Login</button>
    ) : (
    <button onClick={handleSignOut}>Logout</button>
    );
}
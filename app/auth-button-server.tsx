import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "./auth-button-client";

export default async function AuthButtonServer() {
    const cookieStore = cookies(); 
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

    const { data: { session } } = await supabase.auth.getSession();

    return <AuthButtonClient session={session}/>
    
}
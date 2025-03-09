import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "../auth-button-client";
import { redirect } from "next/navigation";
 

export default async function Login() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        redirect('/')
      }
      return <AuthButtonClient session={session}/>
}
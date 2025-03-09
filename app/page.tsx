import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";

export default async function Home() {
  const cookieStore = cookies(); // ⚠️ No se puede usar `await` aquí
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: tweets } = await supabase.from("tweets").select();


  return (
    <>
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  )
}

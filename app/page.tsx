import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButton from "./auth-button";

export default async function Home() {
  const cookieStore = cookies(); // ⚠️ No se puede usar `await` aquí
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: tweets } = await supabase.from("tweets").select();


  return (
    <>
      <AuthButton />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  )
}

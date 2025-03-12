import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }

  // Sin .eq(), supabase podría manejar esto si RLS y relaciones están configuradas
  const { data: tweets, error } = await supabase
    .from("tweets")
    .select("*, profiles(username, name, avatar_url)");

  if (error) {
    console.error("Error al obtener los tweets:", error);
  }

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet?.profiles?.username}</p>
          <p>{tweet.title}</p>
        </div>
      ))}
    </>
  );
}

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Likes from "./likes";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login');
  }

  // Sin .eq(), supabase podría manejar esto si RLS y relaciones están configuradas
  const { data } = await supabase
    .from("tweets")
    .select("*, profiles(*), likes(*)");
  const tweets = data?.map((tweet) => ({
    ...tweet,
    user_has_liked_tweet: tweet.likes.find(like => like.user_id === session.user.id),
    likes: tweet.likes.length
  }))?? [];

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet?.profiles?.username}</p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet}/>
        </div>
      ))}
    </>
  );
}

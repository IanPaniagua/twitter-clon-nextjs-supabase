import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "./new-tweet";
import Likes from "./likes";
import { Database } from "@/lib/database.types";
import Tweets from "./tweets";

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
    .select("*, author: profiles(*), likes(user_id)");
  const tweets = data?.map((tweet) => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: tweet.likes.some(like => like.user_id === session.user.id),
    likes: tweet.likes.length
  }))?? [];

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      <Tweets tweets={tweets} />
    </>
  );
}

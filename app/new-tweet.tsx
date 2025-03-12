import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default function NewTweet() {
    return (
      <form action={addTweet}>
        <label>New Tweet</label>
        <input name="title" className="bg-inherit" />
        <button type="submit">Post</button>
      </form>
    );
  }

  async function addTweet(formData: FormData){
    'use server'
    const title = String(formData.get('title'));
    const cookieStore = cookies(); 
    const supabase = createServerActionClient<Database>({ cookies: () => cookieStore });

    const { data: { user } } = await supabase.auth.getUser();
    if(user){
        await supabase.from('tweets').insert({title, user_id: user.id});
    }
}
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Asegurarse de que la operación asincrónica se complete correctamente
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirige a la URL de origen del request
  return NextResponse.redirect(requestUrl.origin);
}

import { WIX_OAUTH_DATA_COOKIE, WIX_SESSION_COOKIE } from "@/lib/constant";
import { getWixServerClient } from "@/lib/wix-client.server";
import { OauthData } from "@wix/sdk";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");
  const error_description = req.nextUrl.searchParams.get("error_description");

  if (error) {
    return new Response(error_description, { status: 400 });
  }

  try {
    // ✅ FIX: AWAIT cookies() before using
    const cookieStore = await cookies();
    const oAuthDataCookie = cookieStore.get(WIX_OAUTH_DATA_COOKIE)?.value;

    if (!code || !state || !oAuthDataCookie) {
      return new Response("Invalid request", { status: 400 });
    }

    const oAuthData: OauthData = JSON.parse(oAuthDataCookie);

    // Verify state matches (security check)
    if (state !== oAuthData.state) {
      return new Response("Invalid state", { status: 400 });
    }

    const wixClient = await getWixServerClient();
    const memberTokens = await wixClient.auth.getMemberTokens(
      code,
      state,
      oAuthData
    );

    // ✅ Set cookies properly (await not needed for set/delete)
    cookieStore.delete(WIX_OAUTH_DATA_COOKIE);
    cookieStore.set(WIX_SESSION_COOKIE, JSON.stringify(memberTokens), {
      maxAge: 60 * 60 * 24 * 14, // 14 days
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return new Response(null, {
      status: 302,
      headers: {
        Location: oAuthData.originalUri || "/",
      },
    });
  } catch (error) {
    console.error("Auth callback error:", error);
    return new Response("Authentication failed", { status: 500 });
  }
}
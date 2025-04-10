import { Tokens } from "@wix/sdk";
import { cookies } from "next/headers";
import { cache } from "react";
import { WIX_SESSION_COOKIE } from "./constant";
import { getWixClient } from "./wix-client.base";

// Function to retrieve tokens from cookies
export const getWixServerClient = cache(async () => {  // Make async
  let tokens: Tokens | undefined;

  try {
    const cookieStore = await cookies();  // Add await
    tokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || "{}");
  } catch (error) {
    console.error("Error parsing cookies:", error);
  }

  return getWixClient(tokens);
});


// export const getWixServerClient = cache(() => {
//   let tokens: Tokens | undefined;

//   try {
//     const cookieStore = cookies(); // Assuming this is sync in your framework
//     tokens = JSON.parse(cookieStore.get(WIX_SESSION_COOKIE)?.value || "{}");
//   } catch (error) {
//     console.error("Error parsing cookies:", error);
//   }

//   return getWixClient(tokens);
// });

// Cached function for Wix client
// // import { env } from "@/env";
// // import { files } from "@wix/media";
// // import { ApiKeyStrategy, createClient, Tokens } from "@wix/sdk";

// export const getWixServerClient = cache(() => {
//   let tokens: Tokens | undefined;

//   try {
//     tokens = JSON.parse(cookies().get(WIX_SESSION_COOKIE)?.value || "{}");
//     // const cookiesData = await cookies();  // Await the cookies
//     // tokens = JSON.parse(cookiesData.get(WIX_SESSION_COOKIE)?.value || "{}");
//   } catch (error) {
//     console.log("err", error);
//   }

//   return getWixClient(tokens);
// });

// export const getWixAdminClient = cache(() => {
//   const wixClient = createClient({
//     modules: {
//       files,
//     },
//     auth: ApiKeyStrategy({
//       apiKey: env.WIX_API_KEY,
//       siteId: env.NEXT_PUBLIC_WIX_SITE_ID,
//     }),
//   });

//   return wixClient;
// });

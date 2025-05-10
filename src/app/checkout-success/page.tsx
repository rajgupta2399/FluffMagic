export const dynamic = "force-dynamic"; // Force dynamic rendering
import Order from "@/components/_components/Order";
// Set to dynamic rendering
import { getWixServerClient } from "@/lib/wix-client.server";
import { getLoggedInMember } from "@/wix-api/members";
import { getOrder } from "@/wix-api/orders";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "./ClearCart";

export const metadata: Metadata = {
  title: "Checkout success",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: { orderId: string; wixMemberLoggedIn?: string };
}) {
  try {
    const wixClient = await getWixServerClient();
    const { orderId } = searchParams;

    if (!orderId) {
      notFound();
    }

    const [order, loggedInMember] = await Promise.all([
      getOrder(wixClient, orderId),
      getLoggedInMember(wixClient),
    ]);

    if (!order) {
      notFound();
    }

    const orderCreatedDate = order._createdDate
      ? new Date(order._createdDate)
      : null;

    return (
      <main className="mx-auto mb-10 mt-24 flex max-w-3xl flex-col items-center space-y-5 px-5">
        <h1 className="text-3xl font-bold">We received your order!</h1>
        <p>A summary of your order was sent to your email address.</p>
        <h2 className="text-2xl font-bold">Order details</h2>
        <Order order={order} />
        {loggedInMember && (
          <Link href="/profile" className="block text-primary hover:underline">
            View all your orders
          </Link>
        )}
        {orderCreatedDate &&
          orderCreatedDate.getTime() > Date.now() - 60_000 * 5 && <ClearCart />}
      </main>
    );
  } catch (error) {
    console.error("Error loading order:", error);
    notFound();
  }
}

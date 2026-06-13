import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import qrPngUrl from "@/assets/qr.png?url";

export const Route = createFileRoute("/qr.png")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        return Response.redirect(`${origin}${qrPngUrl}`, 301);
      },
    },
  },
});

import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
export async function PATCH(
    req: Request,
    { params: { serverId } }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();

        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                name,
                imageUrl,
            },
        });

        return NextResponse.json(server);
    } catch (e) {
        console.log("[SERVER_ID_PATCH]", e);
        return new NextResponse("Internal error", { status: 500 });
    }
}
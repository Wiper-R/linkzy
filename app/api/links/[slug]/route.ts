import { NextRequest } from "next/server";
import { successResponse } from "../../_response";
import { editLinkSchema } from "@/validators/linksValidator";
import prisma from "@/prisma";
import { cleanShortenLink, requiredRecordsNotFound } from "@/lib/utils";
import { getSession } from "@/auth/session";
import errorCodes from "../../_error-codes";

type Params = { params: { slug: string } };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const body = await request.json();
  const data = editLinkSchema.parse(body);

  const session = await getSession();
  if (!session) return errorCodes.unauthorized();

  try {
    var shortenLink = await prisma.shortenLink.update({
      where: { slug, userId: session.user.id },
      data,
    });
  } catch (e) {
    if (requiredRecordsNotFound(e)) return errorCodes.unauthorized();

    return errorCodes.unknown();
  }
  return successResponse({ shortenLink: cleanShortenLink(shortenLink) });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { slug } = params;
  const session = await getSession();
  if (!session) return errorCodes.unauthorized();
  try {
    var shortenLink = await prisma.shortenLink.delete({
      where: { slug, userId: session.user.id },
    });
  } catch (e) {
    if (requiredRecordsNotFound(e)) return errorCodes.unauthorized();
    return errorCodes.unknown();
  }
  return successResponse(
    { shortenLink: cleanShortenLink(shortenLink) },
    { status: 202 }
  );
}

import { NextResponse } from "next/server";
import "server-only";

export function handleApiError(error: unknown) {
  console.error(error);
  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return new Response("Unknown error occurred", { status: 500 });
}

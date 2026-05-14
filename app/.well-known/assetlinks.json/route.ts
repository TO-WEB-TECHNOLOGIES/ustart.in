import { NextResponse } from "next/server";
import assetlinks from "./assetlinks.json";

export async function GET() {
  return NextResponse.json(assetlinks);
}
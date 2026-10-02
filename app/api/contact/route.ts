import { handleContact, publicContactConfig } from '@/server/contact/service';
export const runtime = 'nodejs';
export const maxDuration = 35;
export const dynamic = 'force-dynamic';
export function GET() { return Response.json(publicContactConfig(), { headers: { 'Cache-Control': 'no-store' } }); }
export const POST = handleContact;

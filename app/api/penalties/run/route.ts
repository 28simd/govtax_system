import { runPenaltyAutomation } from '@/lib/penalty-automation';
export async function POST(req: Request){ const body=await req.json(); return Response.json(await runPenaltyAutomation(body)); }

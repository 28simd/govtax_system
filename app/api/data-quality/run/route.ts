import { runDataQualityScan } from '@/lib/data-quality';
export async function POST(req: Request){ const {tenantId}=await req.json(); return Response.json(await runDataQualityScan(tenantId)); }

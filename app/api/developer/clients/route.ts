import { createApiClient } from '@/lib/api-keys';
export async function POST(req: Request){ const body=await req.json(); const result=await createApiClient(body); return Response.json(result,{status:201}); }

import { requestClearanceCertificate } from '@/lib/clearance';
export async function POST(req: Request){ const body=await req.json(); const cert=await requestClearanceCertificate(body); return Response.json(cert,{status:201}); }

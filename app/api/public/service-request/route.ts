import { prisma } from '@/lib/prisma';
export async function POST(req: Request){ const body=await req.json(); const request=await prisma.publicServiceRequest.create({data:{tenantId:body.tenantId,type:body.type,trackingNo:`PUB-${Date.now()}`,requesterName:body.requesterName,requesterEmail:body.requesterEmail,payload:body}}); return Response.json(request,{status:201}); }

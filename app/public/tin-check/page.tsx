import { prisma } from '@/lib/prisma';
export default async function Page({ searchParams }: { searchParams: Promise<{ tin?: string }> }){
  const {tin}=await searchParams; const taxpayer=tin?await prisma.taxpayer.findFirst({where:{tin}}):null;
  return <main className="mx-auto max-w-xl p-8"><div className="card"><h1 className="text-3xl font-black">TIN Check</h1><form className="mt-4 flex gap-2"><input className="input" name="tin" placeholder="Enter TIN"/><button className="btn">Check</button></form>{tin&&<p className="mt-4">{taxpayer?`Valid: ${taxpayer.name}`:'Not found'}</p>}</div></main>
}

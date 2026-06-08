import { calculateTax } from '@/lib/tax';
export default async function Page({ searchParams }: { searchParams: Promise<{ income?: string; deductions?: string }> }){
  const s=await searchParams; const income=Number(s.income??0); const deductions=Number(s.deductions??0); const result=income?calculateTax({grossIncome:income,deductions}):null;
  return <main className="mx-auto max-w-xl p-8"><form className="card space-y-4"><h1 className="text-3xl font-black">Public Tax Calculator</h1><input className="input" name="income" placeholder="Gross income"/><input className="input" name="deductions" placeholder="Deductions"/><button className="btn">Estimate</button>{result&&<pre className="rounded bg-slate-100 p-4">{JSON.stringify(result,null,2)}</pre>}</form></main>
}

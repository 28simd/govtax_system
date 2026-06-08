import Link from 'next/link';
/** Public Services Portal
 * Open, unauthenticated services for taxpayers/citizens.
 */
export default function Page(){
  const services=[['Tax Calculator','/public/tax-calculator'],
                  ['TIN Check','/public/tin-check'],
                  ['Forms & Guides','/public/forms'],
                  ['Submit Complaint','/public/complaint'],
                  ['Verify Document','/verify']];
  return <main className="mx-auto max-w-5xl p-8">
    <div className="card">
      <h1 className="text-4xl font-black">Public Tax Services</h1>
      <p className="mt-2 text-slate-600">Self-service tools for citizens and businesses.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{services.map(([label,href])=>
    <Link className="card hover:bg-slate-50" href={href} key={href}>{label}</Link>)}
      </div>
    </div>
  </main>
}

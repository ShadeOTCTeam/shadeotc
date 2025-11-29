import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <header className="mb-8">
        <h1 className="text-4xl font-bold">ShadeOTC</h1>
        <p className="text-slate-600 mt-2">Zero-Knowledge OTC proofs for decentralized markets.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <nav className="col-span-1">
          <ul className="space-y-3">
            <li><Link href="/docs/overview">Overview</Link></li>
            <li><Link href="/docs/quickstart">Quickstart</Link></li>
            <li><Link href="/docs/sdk-api">SDK API</Link></li>
            <li><Link href="/docs/onchain">On-Chain Program</Link></li>
            <li><Link href="/docs/noir">Noir Circuits</Link></li>
          </ul>
        </nav>

        <article className="col-span-2">
          <h2 className="text-2xl font-semibold">Get started</h2>
          <p className="mt-3 text-slate-700">Open the Quickstart to run an example flow: create a proof locally and submit it on Solana via the SDK.</p>
        </article>
      </section>
    </main>
  )
}

import './styles/globals.css'

export const metadata = {
  title: 'ShadeOTC Docs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-8">{children}</div>
      </body>
    </html>
  )
}

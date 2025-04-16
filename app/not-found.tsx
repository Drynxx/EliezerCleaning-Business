import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Pagină negăsită</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Ne pare rău, pagina pe care o căutați nu există sau a fost mutată.
        </p>
        <Link href="/" passHref>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Home className="h-4 w-4" />
            Înapoi la pagina principală
          </Button>
        </Link>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert, Home } from 'lucide-react'
import Link from "next/link"

export default function EnhancedAccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4 dark:from-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <ShieldAlert className="size-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            We&apos;re sorry, but you don&apos;t have permission to access this page. This area is restricted to authorized personnel only.
          </p>
          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Why am I seeing this?</h3>
            <ul className="list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
              <li>You may not be logged in</li>
              <li>Your account may not have the necessary permissions</li>
              <li>You might have followed an outdated or incorrect link</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/">
            <Button className="w-full">
              <Home className="mr-2 size-4" /> Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}


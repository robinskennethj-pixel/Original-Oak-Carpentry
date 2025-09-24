import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to English locale as default
  redirect('/en')
}

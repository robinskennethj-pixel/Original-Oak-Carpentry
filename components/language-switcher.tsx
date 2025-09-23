'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] === 'es' ? 'es' : 'en'
  const currentLanguage = languages.find(lang => lang.code === currentLocale)

  const switchLanguage = (newLocale: string) => {
    // Get the current path without the locale
    const pathWithoutLocale = pathname.replace(/^\/(en|es)/, '').replace(/^\//, '') || ''

    // Build the new path with the selected locale
    const newPath = newLocale === 'en'
      ? `/${pathWithoutLocale}`
      : `/${newLocale}/${pathWithoutLocale}`

    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.name}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="gap-2"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
'use client'

import { useTranslations } from 'next-intl'

export default function TestPage() {
  const t = useTranslations('header')

  return (
    <div>
      <h1>{t('home')}</h1>
      <p>Test page for hydration debugging</p>
    </div>
  )
}
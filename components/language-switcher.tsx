"use client"

import { Locale } from "@/lib/i18n"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useRouter } from "next/navigation"

const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
]

interface LanguageSwitcherProps {
    currentLocale: Locale
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const router = useRouter()

    const setLocale = (newLocale: Locale) => {
        // Set cookie
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
        // Refresh page to apply server-side translations
        router.refresh()
    }

    const currentLanguage = languages.find((l) => l.code === currentLocale) || languages[0]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 px-0 sm:w-auto sm:px-3 gap-2">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline-block font-medium">{currentLanguage.code.toUpperCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px] z-[200]">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLocale(lang.code)}
                        className={`flex items-center justify-between cursor-pointer ${currentLocale === lang.code ? 'bg-accent text-accent-foreground' : ''
                            }`}
                    >
                        <span>{lang.label}</span>
                        <span className="text-lg">{lang.flag}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

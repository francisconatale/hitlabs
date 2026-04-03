import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { getServerLocale } from "@/lib/i18n-server"
import { getTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Mail } from "lucide-react"

export default async function TeamPage() {
    const locale = await getServerLocale()
    const t = getTranslation(locale)

    const teamMembers = [
        {
            id: 1,
            name: "Francisco Natale",
            role: "Founder & Full Stack Developer",
            bio: "Passionate about building scalable software solutions and bringing ideas to life.",
            initials: "FN",
            image: "/natale.png",
            socials: {
                github: "https://github.com/francisconatale",
                linkedin: "https://linkedin.com/in/1francisco",
                email: "mailto:francisconatale9@gmail.com"
            }
        }
    ]

    return (
        <main className="min-h-screen bg-background pt-16">
            <Navbar navT={t.navbar} commonT={t.common} currentLocale={locale} />
            <div className="py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold tracking-tighter text-primary">
                        {t.team.headline}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-[800px]">
                        {t.team.subheadline}
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {teamMembers.map((member) => (
                        <Card key={member.id} className="w-full sm:max-w-sm border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                            <CardHeader className="pb-4 items-center text-center">
                                <Avatar className="h-24 w-24 mb-4 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-2xl font-bold">{member.name}</CardTitle>
                                <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center pb-2">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {member.bio}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-center gap-4 pt-4 pb-8">
                                <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                    <Github className="h-5 w-5" />
                                </a>
                                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                                <a href={member.socials.email} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="h-5 w-5" />
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <SiteFooter commonT={t.common} />
        </main>
    )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { TranslationDict } from "@/lib/i18n"

interface ContactFormProps {
    contactT: TranslationDict['contact']
}

export function ContactForm({ contactT }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("sending")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", message: "" })
            } else {
                setStatus("error")
            }
        } catch (error) {
            setStatus("error")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background/50 backdrop-blur-xl border border-primary/10 p-8 md:p-12 shadow-2xl relative"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-2">
                        {contactT.form.name}
                    </label>
                    <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-primary/10 focus:border-primary/40 h-12 rounded-none transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-2">
                        {contactT.form.email}
                    </label>
                    <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-primary/10 focus:border-primary/40 h-12 rounded-none transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-2">
                        {contactT.form.message}
                    </label>
                    <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-transparent border-primary/10 focus:border-primary/40 min-h-[150px] rounded-none transition-all resize-none"
                    />
                </div>

                <div className="pt-4">
                    <Button 
                        type="submit" 
                        disabled={status === "sending"}
                        className="w-full bg-primary text-primary-foreground hover:bg-transparent hover:text-primary border-2 border-primary text-[11px] font-bold uppercase tracking-[0.2em] h-14 transition-all duration-500 rounded-none overflow-hidden group relative"
                    >
                        <span className="flex items-center justify-center">
                            {status === "sending" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {contactT.form.sending}
                                </>
                            ) : (
                                <>
                                    {contactT.form.send}
                                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </Button>
                </div>

                <AnimatePresence>
                    {status === "success" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 text-green-500"
                        >
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">{contactT.form.success}</span>
                        </motion.div>
                    )}
                    {status === "error" && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500"
                        >
                            <AlertCircle className="h-5 w-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">{contactT.form.error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
            
            <div className="absolute -top-px -right-px w-8 h-8 border-t border-r border-primary/20 pointer-events-none" />
            <div className="absolute -bottom-px -left-px w-8 h-8 border-b border-l border-primary/20 pointer-events-none" />
        </motion.div>
    )
}

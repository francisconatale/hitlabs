import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        // Log the submission (placeholder for real email sending)
        console.log('Contact form submission:', { name, email, message })

        // In a real scenario, you could use Resend, SendGrid, etc. here.
        /*
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'your-email@example.com',
            subject: `New Contact from ${name}`,
            text: message,
        })
        */

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error in contact API:', error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}

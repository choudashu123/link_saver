import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()
        console.log("---url-----", url)
        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
        }

        // const encodedUrl = encodeURIComponent(url)
        // console.log("encoded", encodedUrl)
        // const jinaRes = await fetch(`https://r.jina.ai/https://${encodedUrl}`)
        // First try fetching using HTTPS
        let jinaRes = await fetch(`https://r.jina.ai/${url}`)

        // If HTTPS fails, fallback to HTTP
        if (!jinaRes.ok) {
            console.warn('HTTPS request failed, trying HTTP instead.')
            jinaRes = await fetch(`http://r.jina.ai/http://${url}`)
        }

        if (!jinaRes.ok) {
            throw new Error('Failed to fetch summary from Jina')
        }

        const summary = await jinaRes.text()
        console.log("--------summary---------", summary)
        return NextResponse.json({ summary })
    } catch (err) {
        return NextResponse.json(
            { summary: 'Summary temporarily unavailable.' },
            { status: 500 }
        )
    }
}

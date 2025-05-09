import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()
        if (!url) {
            return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
        }
        const jinaRes = await fetch(`https://r.jina.ai/${url}`)

        if (!jinaRes.ok) {
            throw new Error('Failed to fetch summary from Jina')
        }
        const summary = await jinaRes.text()
        return NextResponse.json({ summary })
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { summary: 'Summary temporarily unavailable.' },
            { status: 500 }
        )
    }
}

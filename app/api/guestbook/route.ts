import { NextRequest, NextResponse } from 'next/server'
import { client } from '../../../sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, message, country, link } = body

    // Validate required fields
    if (!name || !message || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the guestbook entry in Sanity
    const newEntry = await client.create({
      _type: 'guestbook',
      name,
      message,
      country,
      link: link || null,
      date: new Date().toISOString(),
      approved: true, // Set to false if you want manual approval
    })

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error('Error creating guestbook entry:', error)
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    )
  }
}

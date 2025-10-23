import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '../../../../sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const { entryId } = await request.json();

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    // Increment the reactions count
    const updated = await writeClient
      .patch(entryId)
      .inc({ reactions: 1 })
      .commit();

    return NextResponse.json({ success: true, reactions: updated.reactions });
  } catch (error) {
    console.error('Error adding reaction:', error);
    return NextResponse.json(
      {
        error: 'Failed to add reaction',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

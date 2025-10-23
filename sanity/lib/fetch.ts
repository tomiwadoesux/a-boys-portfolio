import { client } from './client'
import { nowQuery, projectsQuery, featuredProjectsQuery, guestbookQuery, lastVisitorQuery, lastVisitorLocationQuery, listQuery, screensQuery } from './queries'

// Type definitions for the data
export interface NowData {
  _id: string
  date: string
  text: string
  order: number
}

export interface ListData {
  _id: string
  text: string
  completed?: boolean
  completedDate?: string
}

export interface ScreenData {
  _id: string
  name: string
  desktopVideo?: string | null
  mobileVideo?: string | null
  link?: string | null
  order: number
}

export interface ProjectData {
  _id: string
  title: string
  subtitle: string
  tech: string
  desktopImage: string
  mobileImage: string
  alt: string
  desktopVideo?: string | null
  mobileVideo?: string | null
  link: string
  featured: boolean
  figcaption: string
  description: string
  order: number
}

export interface GuestbookData {
  _id: string
  name: string
  message: string
  country: string
  link?: string | null
  date: string
  approved: boolean
}

// Fetch all "Now" entries
export async function getNowData(): Promise<NowData[]> {
  try {
    const data = await client.fetch<NowData[]>(nowQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching now data:', error)
    return []
  }
}

// Fetch all projects
export async function getProjects(): Promise<ProjectData[]> {
  try {
    const data = await client.fetch<ProjectData[]>(projectsQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Fetch only featured projects
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  try {
    const data = await client.fetch<ProjectData[]>(featuredProjectsQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// Fetch all approved guestbook entries
export async function getGuestbookEntries(): Promise<GuestbookData[]> {
  try {
    const data = await client.fetch<GuestbookData[]>(guestbookQuery, {}, {
      next: { revalidate: 60 } // Revalidate every minute for guestbook
    })
    return data
  } catch (error) {
    console.error('Error fetching guestbook entries:', error)
    return []
  }
}

// Fetch the last visitor's country
export async function getLastVisitor(): Promise<string | null> {
  try {
    const data = await client.fetch<{ country: string } | null>(lastVisitorQuery, {}, {
      next: { revalidate: 60 } // Revalidate every minute
    })
    return data?.country || null
  } catch (error) {
    console.error('Error fetching last visitor:', error)
    return null
  }
}

// Fetch the last visitor's location
export async function getLastVisitorLocation(): Promise<{ city?: string; country: string } | null> {
  try {
    const data = await client.fetch<{ city?: string; country: string } | null>(lastVisitorLocationQuery, {}, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    })
    return data
  } catch (error) {
    console.error('Error fetching last visitor location:', error)
    return null
  }
}

// Fetch all list entries
export async function getListData(): Promise<ListData[]> {
  try {
    const data = await client.fetch<ListData[]>(listQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching list data:', error)
    return []
  }
}

// Fetch all screens
export async function getScreens(): Promise<ScreenData[]> {
  try {
    const data = await client.fetch<ScreenData[]>(screensQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching screens:', error)
    return []
  }
}

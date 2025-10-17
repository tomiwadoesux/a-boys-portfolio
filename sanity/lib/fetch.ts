import { client } from './client'
import { nowQuery, projectsQuery, featuredProjectsQuery, guestbookQuery } from './queries'

// Type definitions for the data
export interface NowData {
  _id: string
  date: string
  text: string
  order: number
}

export interface ProjectData {
  _id: string
  title: string
  subtitle: string
  tech: string
  image: string
  alt: string
  video?: string | null
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

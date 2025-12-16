import { client } from './client'
import { nowQuery, projectsQuery, featuredProjectsQuery, guestbookQuery, lastVisitorQuery, lastVisitorLocationQuery, listQuery, screensQuery, cardsQuery, labQuery, typewriterMessagesQuery } from './queries'

// Type definitions for the data
export interface NowData {
  _id: string
  date: string
  text: string
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
  title?: string
  desktopImage?: string | null
  mobileImage?: string | null
  desktopVideo?: string | null
  mobileVideo?: string | null
  link?: string | null
  order: number
}

export interface InfoSection {
  media: {
    type: 'image' | 'video'
    image?: string | null
    video?: string | null
  }
  text: string
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
  showDetailPage: boolean
  figcaption: string
  description: string
  role: string
  order: number
  infoSections?: InfoSection[]
}

export interface GuestbookData {
  _id: string
  name: string
  message: string
  city?: string
  region?: string
  country: string
  link?: string | null
  date: string
  approved: boolean
  stampImage?: {
    asset: {
      url: string
    }
  }
  stampGenerating?: boolean
  reactions?: number
  isFirstFromCountry?: boolean
}

export interface CardData {
  _id: string
  title: string
  description: string
  image: {
    asset: {
      url: string
    }
  }
  size: 'small' | 'medium' | 'large'
  order: number
}

export interface LabData {
  title: string
  description?: string
  image?: string
  link?: string
  height: string
  order: number
}

export interface TypewriterMessageData {
  _id: string
  message: string
  isActive: boolean
  order: number
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

// Fetch all projects (with caching)
export async function getProjects(): Promise<ProjectData[]> {
  try {
    const data = await client.fetch<ProjectData[]>(projectsQuery, {}, {
      next: { revalidate: 0 } // Disable cache for debugging
    })
    return data
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Fetch a single project by numeric index (optimized for detail pages)
export async function getProjectByIndex(index: number): Promise<ProjectData | null> {
  try {
    // Fetch all projects once and cache them
    const allProjects = await getProjects()
    if (index >= 0 && index < allProjects.length) {
      return allProjects[index]
    }
    return null
  } catch (error) {
    console.error('Error fetching project by index:', error)
    return null
  }
}

// Fetch only featured projects
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  try {
    const data = await client.fetch<ProjectData[]>(featuredProjectsQuery, {}, {
      next: { revalidate: 0 } // Disable cache for debugging
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

// Fetch all cards
export async function getCards(): Promise<CardData[]> {
  try {
    const data = await client.fetch<CardData[]>(cardsQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching cards:', error)
    return []
  }
}

// Fetch all lab cards
export async function getLabCards(): Promise<LabData[]> {
  try {
    const data = await client.fetch<LabData[]>(labQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching lab cards:', error)
    return []
  }
}

// Fetch all active typewriter messages
export async function getTypewriterMessages(): Promise<TypewriterMessageData[]> {
  try {
    const data = await client.fetch<TypewriterMessageData[]>(typewriterMessagesQuery, {}, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    return data
  } catch (error) {
    console.error('Error fetching typewriter messages:', error)
    return []
  }
}

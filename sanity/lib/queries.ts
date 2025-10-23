import { groq } from 'next-sanity'

// Query to fetch all "Now" entries in default order
export const nowQuery = groq`*[_type == "now"] {
  _id,
  date,
  text,
  order
}`

// Query to fetch all projects ordered by display order
export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  _id,
  title,
  subtitle,
  tech,
  "desktopImage": desktopImage.asset->url,
  "mobileImage": mobileImage.asset->url,
  alt,
  "desktopVideo": desktopVideo.asset->url,
  "mobileVideo": mobileVideo.asset->url,
  link,
  featured,
  figcaption,
  description,
  order
}`

// Query to fetch only featured projects
export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc) {
  _id,
  title,
  subtitle,
  tech,
  "desktopImage": desktopImage.asset->url,
  "mobileImage": mobileImage.asset->url,
  alt,
  "desktopVideo": desktopVideo.asset->url,
  "mobileVideo": mobileVideo.asset->url,
  link,
  featured,
  figcaption,
  description,
  order
}`

// Query to fetch all approved guestbook entries
export const guestbookQuery = groq`*[_type == "guestbook" && approved == true] | order(date desc) {
  _id,
  name,
  message,
  city,
  country,
  link,
  date,
  approved,
  stampImage {
    asset-> {
      _id,
      url
    }
  },
  stampGenerating,
  reactions,
  isFirstFromCountry
}`

// Query to fetch the last visitor's country
export const lastVisitorQuery = groq`*[_type == "guestbook" && approved == true] | order(date desc) [0] {
  country
}`

// Query to fetch the most recent visitor location
export const lastVisitorLocationQuery = groq`*[_type == "visitor"] | order(timestamp desc) [0] {
  city,
  country
}`

// Query to fetch all list entries in default order
export const listQuery = groq`*[_type == "list"] {
  _id,
  text,
  completed,
  completedDate
}`

// Query to fetch all screens ordered by display order
export const screensQuery = groq`*[_type == "screen"] | order(order asc) {
  _id,
  name,
  "desktopVideo": desktopVideo.asset->url,
  "mobileVideo": mobileVideo.asset->url,
  link,
  order
}`

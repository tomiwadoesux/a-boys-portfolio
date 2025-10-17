import { groq } from 'next-sanity'

// Query to fetch all "Now" entries ordered by display order
export const nowQuery = groq`*[_type == "now"] | order(order asc) {
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
  "image": image.asset->url,
  alt,
  "video": video.asset->url,
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
  "image": image.asset->url,
  alt,
  "video": video.asset->url,
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
  country,
  link,
  date,
  approved
}`

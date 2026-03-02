import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'
import youtube from './youtube'
import service from './service' // Import new schema
import caseStudy from './caseStudy' // Import new schema

// Add them to the array
export const schemaTypes = [post, author, category, blockContent, youtube, service, caseStudy]

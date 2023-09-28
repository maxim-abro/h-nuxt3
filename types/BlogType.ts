export interface BlogTagsType {
  id_tags: number
  title: string
}

export interface BlogType {
  id: string
  title: string
  description: string
  lat_title: string
  date: Date
  likes: number
  preview: string
  counter: number
  body: string
  author: string
  blog_tags: BlogTagsType[]
}

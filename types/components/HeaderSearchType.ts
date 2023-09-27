export interface ShopsSearchType {
  title: string
  image: string
  url: string
  uin: string
  lat_title: string
}

export interface HeaderSearchType {
  shops: ShopsSearchType[]
}

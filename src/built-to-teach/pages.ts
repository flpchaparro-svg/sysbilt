import type { BtwPage } from './types'
import { frontPages } from './chapters/front'
import { ch01Pages } from './chapters/ch01'
import { ch02Pages } from './chapters/ch02'
import { ch03Pages } from './chapters/ch03'
import { ch04Pages } from './chapters/ch04'
import { ch05Pages } from './chapters/ch05'
import { ch06Pages } from './chapters/ch06'
import { ch07Pages } from './chapters/ch07'
import { ch08Pages } from './chapters/ch08'
import { ch09Pages } from './chapters/ch09'
import { ch10Pages } from './chapters/ch10'
import { ch11Pages } from './chapters/ch11'
import { ch12Pages } from './chapters/ch12'

export const BTE_RAW_CONTENT_PAGES: BtwPage[] = [
  ...frontPages,
  ...ch01Pages,
  ...ch02Pages,
  ...ch03Pages,
  ...ch04Pages,
  ...ch05Pages,
  ...ch06Pages,
  ...ch07Pages,
  ...ch08Pages,
  ...ch09Pages,
  ...ch10Pages,
  ...ch11Pages,
  ...ch12Pages,
]

export const BTE_CONTENT_PAGES = BTE_RAW_CONTENT_PAGES

export function bteTotalPages(): number {
  return BTE_CONTENT_PAGES.length
}

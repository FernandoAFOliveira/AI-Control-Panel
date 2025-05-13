// frontend/src/svg.d.ts
declare module '*.svg?component' {
  import type { ComponentType, SVGProps } from 'react'
  export const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>
  const src: string
  export default src
}


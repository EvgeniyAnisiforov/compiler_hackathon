import { FC, ReactElement } from "react"


const AnimationLoading: FC<{}> = (): ReactElement => {
  return (
    <main>
      <svg className="pl2" viewBox="0 0 128 128" width="128px" height="128px">
            <defs>
                <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000" />
                <stop offset="100%" stopColor="#fff" />
                    </linearGradient>
                <mask id="pl-mask">
                    <rect x="0" y="0" width="128" height="128" fill="url(#pl-grad)" />
                </mask>
            </defs>
            <g fill="var(--primary)">
                <g className="pl2__rect-g">
            <rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
            <rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
            <rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
            </g>
            <g fill="hsl(283,90%,50%)" mask="url(#pl-mask)">
                <g className="pl2__rect-g">
            <rect className="pl2__rect" rx="8" ry="8" x="0" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
            <rect className="pl2__rect" rx="8" ry="8" x="44" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
                <g className="pl2__rect-g">
            <rect className="pl2__rect" rx="8" ry="8" x="88" y="128" width="40" height="24" transform="rotate(180)" />
                </g>
            </g>
        </svg>
    </main>
  )
}
export default AnimationLoading

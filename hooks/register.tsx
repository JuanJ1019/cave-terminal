import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Cave Terminal: an underground command-center computer. Near-black stone,
// gunmetal steel panels, cold blue monitor light, red alert accents.
const { theme, problems } = makeColors({
  label: 'Cave Terminal',
  only: 'dark',
  roles: {
    accent: '#4da3ff', // cold monitor blue
    danger: '#e0242f', // red alert
    success: '#39d98a',
    warning: '#d8a13a', // amber
    pro: '#9fd0ff', // pale monitor glow
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#07080a', // cave black
        'surface-1': '#121418', // gunmetal panels
        'surface-2': '#1b1e24', // hover steel
        'surface-3': '#1f232a',
        'text-primary': '#c9d3df', // cool steel-white
        'text-secondary': '#a3afbd',
        'text-muted': '#7f8b99',
      },
    },
  },
})

// The stylesheet's background, redrawn as a scene: monitor wash from above,
// faint red standby glow bottom-left, stone grain, and steady CRT lines.
const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .wash { animation: hum 9s ease-in-out infinite; }
  .standby { animation: standby 6s ease-in-out infinite; }
  @keyframes hum { 0%,100% { opacity: 1 } 50% { opacity: .8 } }
  @keyframes standby { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
  @media (prefers-reduced-motion: reduce) { .wash, .standby { animation: none } }
</style>
<defs>
  <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0b0d10"/><stop offset=".6" stop-color="#07080a"/><stop offset="1" stop-color="#07080a"/>
  </linearGradient>
  <radialGradient id="mon" cx="800" cy="-100" r="1000" gradientTransform="translate(800 -100) scale(1 .6) translate(-800 100)" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#4da3ff" stop-opacity=".16"/><stop offset=".55" stop-color="#4da3ff" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="red" cx="160" cy="1100" r="760" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#e0242f" stop-opacity=".10"/><stop offset=".45" stop-color="#e0242f" stop-opacity="0"/>
  </radialGradient>
  <pattern id="g1" width="37" height="41" patternUnits="userSpaceOnUse"><circle cx="7" cy="12" r="2.5" fill="#fff" fill-opacity=".02"/></pattern>
  <pattern id="g2" width="23" height="29" patternUnits="userSpaceOnUse"><circle cx="16" cy="17" r="1.5" fill="#fff" fill-opacity=".016"/></pattern>
  <pattern id="g3" width="53" height="47" patternUnits="userSpaceOnUse"><circle cx="21" cy="38" r="3.5" fill="#000" fill-opacity=".4"/></pattern>
  <pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".18"/></pattern>
  <linearGradient id="rail" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#4da3ff" stop-opacity="0"/><stop offset=".5" stop-color="#4da3ff" stop-opacity=".35"/><stop offset="1" stop-color="#4da3ff" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect width="1600" height="1000" fill="url(#base)"/>
<rect class="wash" width="1600" height="1000" fill="url(#mon)"/>
<rect class="standby" width="1600" height="1000" fill="url(#red)"/>
<g opacity=".35">
  <rect width="1600" height="1000" fill="url(#g1)"/>
  <rect width="1600" height="1000" fill="url(#g2)"/>
  <rect width="1600" height="1000" fill="url(#g3)"/>
</g>
<rect y="0" width="1600" height="1" fill="url(#rail)"/>
<rect width="1600" height="1000" fill="url(#scan)"/>
</svg>`

const LOOK: ThemeSetArgs = {
  colors: theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'cave-terminal', glass: { blur: 10, tint: '#121418', opacity: 0.72 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Cave command center: cold monitor light over dark stone, faint scanlines" isInteractive />
  })
}

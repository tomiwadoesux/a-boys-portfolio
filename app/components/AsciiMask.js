'use client'
import { useRef, useEffect } from 'react'

function AsciiMaskComponent({ ascii }) {
  const preRef = useRef(null)
  const charsRef = useRef([])
  const positionsRef = useRef([])
  const animationFrameRef = useRef(null)

  useEffect(() => {
    // Cache initial positions once mounted
    if (preRef.current) {
      const rects = charsRef.current.map((char) =>
        char ? char.getBoundingClientRect() : null
      )
      positionsRef.current = rects.map((r) =>
        r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
      )
    }
  }, [])

  const handleMouseMove = (e) => {
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)

    animationFrameRef.current = requestAnimationFrame(() => {
      const { clientX: mouseX, clientY: mouseY } = e
      const radius = 45 // effect radius
      const force = 8 // displacement strength

      charsRef.current.forEach((char, i) => {
        if (!char || !positionsRef.current[i]) return
        const { x, y } = positionsRef.current[i]
        const dx = x - mouseX
        const dy = y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius) {
          const intensity = (radius - dist) / radius
          const angle = Math.atan2(dy, dx)
          const tx = Math.cos(angle) * intensity * force
          const ty = Math.sin(angle) * intensity * force
          char.style.transform = `translate(${tx}px, ${ty}px)`
          char.style.color = '#4447A9'
        } else {
          char.style.transform = 'translate(0px, 0px)'
          char.style.color = '#000'
        }
      })
    })
  }

  const handleMouseLeave = () => {
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current)

    charsRef.current.forEach((char) => {
      if (!char) return
      char.style.transform = 'translate(0px, 0px)'
      char.style.color = '#000'
    })
  }

  return (
    <pre
      ref={preRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily: 'monospace',
        fontSize: '0.6rem',
        lineHeight: '1.0',
        color: '#000',
        userSelect: 'none',
        whiteSpace: 'pre',
        margin: 0,
        overflow: 'hidden',
        width: 'fit-content',
        cursor: 'pointer',
      }}
    >
      {ascii.split('').map((char, i) =>
        char === '\n' ? (
          <br key={i} />
        ) : (
          <span
            key={i}
            ref={(el) => (charsRef.current[i] = el)}
            style={{
              display: 'inline-block',
              transition: 'transform 0.2s ease-out, color 0.3s ease-out',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      )}
    </pre>
  )
}

export default function AsciiMask() {
  const ascii = `---------------------------------------------------
---------------------------------------------------
---------------------------------------------------
-------------------------+=------------------------
----------------------*#%%##%##+-------------------
-------------------+%%%#####*+=#%%%*---------------
-----------------+::::::::::::-%##%###+------------
*+---------------#-:::::::::::=%##%######=---------
########*=-------%+:::::::::::+%###%###############
###############**%#:::::::::::*%###%###############
#################%%-::::::::::#%####%##############
################%#%=:::::::::-%#####%#**###########
#############*++%#%+:::::::::=%#####%#+++++++++++++
########*++++++*%###*=-::::::*%######%*++++++++++++
###*+++++++++++#########%%%%**%######%%++++++++++++
+++++++++++++++#%%%######%#-:#%######%%++++++++++++
+++++++++++++++%########%*:::*%####%%%%#+++++++++++
++++++++++++++*%%####%%#-::::*%###%%%%%%%#+++++++++
++++++++++++++#%#####%+::::::*%%%%%%%%%%%%%#+++++++
+++++++++++++*%%##%%#-:::::::+%%%%%%%%%%%%%%%*+++++
++++++++++++*%%###%=:::::::::*%%%%%%%%%%%%%%%%%*+++
+++++++++++*%%%#%#:::::::::::+%%%%%%%%%%%%%%%%%%%*+
++++++++++*%%%%#-::::::::::::+%%%%%%%%%%%%%%%%%%%%%
 Pauli%%%%%=-::::::::::::=%%%%%%%%%%%%%%%%%%%%%
++++++++%%%%%%%%*************#%%%%%%%%%%%%%%%%%%%%%
+++++++%%%%%%%%%%**********#%%%%%%%%%%%%%%%%%%%%%%%
++++++%%%%%%%%%%%#*******#%%%%%%%%%%%%%%%%%%%%%%%%%
+++++%%%%%%%%%%%%%#****#%%%%%%%%%%%%%%%%%%%%%%%%%%%
++++%%%%%%%%%%%%%%%#*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
+++%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
++##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*#####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
########%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#########%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%`

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
      }}
    >
      <AsciiMaskComponent ascii={ascii} />
    </div>
  )
}

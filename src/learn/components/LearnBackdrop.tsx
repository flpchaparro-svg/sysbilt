import React, {useEffect, useRef} from 'react'

type Particle = {
  x: number
  y: number
  r: number
  a: number
  vx: number
  vy: number
  w: number
  p: number
  ink: boolean
}

export function LearnBackdrop() {
  const wash = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({x: 50, y: 40})
  const current = useRef({x: 50, y: 40})
  const lag = useRef({x: 48, y: 55})

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let frame = 0
    const particles: Particle[] = []

    function resize() {
      const box = parent!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = box.width
      h = box.height
      canvas!.width = Math.floor(w * dpr)
      canvas!.height = Math.floor(h * dpr)
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function seed() {
      particles.length = 0
      const count = Math.max(36, Math.floor((w * h) / 22000))
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.35 + Math.random() * 1.1,
          a: 0.04 + Math.random() * 0.07,
          vx: (Math.random() - 0.5) * 0.05,
          vy: -0.04 - Math.random() * 0.08,
          w: 0.5 + Math.random() * 1.2,
          p: Math.random() * Math.PI * 2,
          ink: Math.random() > 0.35,
        })
      }
    }

    function onMove(e: PointerEvent) {
      const box = parent!.getBoundingClientRect()
      mouse.current = {
        x: ((e.clientX - box.left) / Math.max(box.width, 1)) * 100,
        y: ((e.clientY - box.top) / Math.max(box.height, 1)) * 100,
      }
    }

    function tick() {
      current.current.x += (mouse.current.x - current.current.x) * 0.045
      current.current.y += (mouse.current.y - current.current.y) * 0.045
      lag.current.x += (current.current.x - lag.current.x) * 0.02
      lag.current.y += (current.current.y - lag.current.y) * 0.02
      const node = wash.current
      if (node) {
        node.style.setProperty('--mx', `${current.current.x}%`)
        node.style.setProperty('--my', `${current.current.y}%`)
        node.style.setProperty('--lx', `${lag.current.x}%`)
        node.style.setProperty('--ly', `${lag.current.y}%`)
      }

      ctx!.clearRect(0, 0, w, h)
      const pullX = (current.current.x / 100 - 0.5) * 0.35
      const pullY = (current.current.y / 100 - 0.5) * 0.35
      for (const p of particles) {
        p.p += 0.006
        p.x += p.vx + Math.sin(p.p) * p.w * 0.22 + pullX
        p.y += p.vy + Math.cos(p.p * 0.7) * 0.04 + pullY * 0.4
        if (p.y < -10) {
          p.y = h + 8
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 8
        if (p.x > w + 10) p.x = -8
        ctx!.beginPath()
        ctx!.fillStyle = p.ink ? `rgba(26, 26, 26, ${p.a * 0.85})` : `rgba(197, 160, 89, ${p.a})`
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
      }
      frame = requestAnimationFrame(tick)
    }

    resize()
    seed()
    const ro = new ResizeObserver(() => {
      resize()
      seed()
    })
    ro.observe(parent)
    parent.addEventListener('pointermove', onMove)
    frame = requestAnimationFrame(tick)
    return () => {
      ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        ref={wash}
        className="absolute inset-0"
        style={{
          background: [
            'radial-gradient(36rem circle at var(--mx, 50%) var(--my, 42%), rgba(197,160,89,0.16), transparent 58%)',
            'radial-gradient(28rem circle at var(--lx, 42%) var(--ly, 58%), rgba(26,26,26,0.055), transparent 62%)',
          ].join(','),
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

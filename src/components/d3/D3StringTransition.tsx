import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface D3StringTransitionProps {
  color?: string
  accentColor?: string
}

export default function D3StringTransition({
  color = '#F5A623',
  accentColor = '#3ECFCF',
}: D3StringTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    let width = container.clientWidth || 1000
    const height = 70
    const centerY = height / 2

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
    svg.attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`)

    // Create 16 string control points along the width
    const pointsCount = 18
    const points = Array.from({ length: pointsCount }, (_, i) => ({
      x: (i / (pointsCount - 1)) * width,
      y: centerY,
      targetY: centerY,
      vy: 0,
    }))

    // Define smooth D3 curve line generator
    const lineGenerator = d3
      .line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveBasis)

    // Append Gradient Definition
    const defs = svg.append('defs')
    const gradientId = `string-grad-${Math.random().toString(36).substr(2, 9)}`
    const grad = defs
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')

    grad.append('stop').attr('offset', '0%').attr('stop-color', 'transparent')
    grad.append('stop').attr('offset', '15%').attr('stop-color', color).attr('stop-opacity', 0.8)
    grad.append('stop').attr('offset', '50%').attr('stop-color', accentColor).attr('stop-opacity', 1)
    grad.append('stop').attr('offset', '85%').attr('stop-color', color).attr('stop-opacity', 0.8)
    grad.append('stop').attr('offset', '100%').attr('stop-color', 'transparent')

    // Append String SVG Path
    const path = svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', `url(#${gradientId})`)
      .attr('stroke-width', 2.5)
      .style('filter', `drop-shadow(0 0 8px ${color}80)`)

    let animFrame: number
    let mouseX = -1000
    let lastMouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
        mouseX = mx
        const dy = my - lastMouseY
        lastMouseY = my

        // Pluck string at closest control point
        points.forEach((p) => {
          const dist = Math.abs(p.x - mouseX)
          if (dist < 90) {
            const force = (1 - dist / 90) * (dy || 12) * 0.8
            p.vy += Math.max(-25, Math.min(25, force))
          }
        })
      }
    }

    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || 1000
      svg.attr('width', width).attr('viewBox', `0 0 ${width} ${height}`)
      points.forEach((p, i) => {
        p.x = (i / (pointsCount - 1)) * width
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Harmonic String Vibration Loop (Physics Spring Simulation)
    const springK = 0.08
    const damping = 0.88

    const render = () => {
      // Update points with spring physics
      points.forEach((p, i) => {
        if (i === 0 || i === points.length - 1) return // Pin ends

        const deltaY = p.y - p.targetY
        const springForce = -springK * deltaY
        p.vy += springForce
        p.vy *= damping
        p.y += p.vy
      })

      path.attr('d', lineGenerator(points) || '')
      animFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [color, accentColor])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '70px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      <svg ref={svgRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}

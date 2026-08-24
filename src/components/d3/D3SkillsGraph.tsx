import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Skill, skillCategories } from '../../data/skills'
import { Sparkles, Info } from 'lucide-react'

interface D3SkillsGraphProps {
  skills: Skill[]
  lang: 'ar' | 'en'
  activeCategory: string
  onCategorySelect: (cat: string) => void
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string
  name: string
  type: 'hub' | 'skill'
  category: string
  color: string
  tagline?: { en: string; ar: string }
  icon?: string
  radius: number
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode
  target: string | GraphNode
}

export default function D3SkillsGraph({
  skills,
  lang,
  activeCategory,
  onCategorySelect,
}: D3SkillsGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0] || null)

  // Ref to preserve node coordinates across state updates & category filtering
  const nodeCoordsRef = useRef<Record<string, { x: number; y: number; vx: number; vy: number }>>({})

  const isAr = lang === 'ar'

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 800
    const height = 480

    // Clear previous SVG contents
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    svg.attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height])

    // Prepare Node Data
    const hubs: GraphNode[] = skillCategories
      .filter((c) => c.key !== 'all')
      .map((c) => ({
        id: `hub-${c.key}`,
        name: c.label[lang],
        type: 'hub',
        category: c.key,
        color:
          c.key === 'frontend'
            ? '#3ECFCF'
            : c.key === 'mobile'
            ? '#F5A623'
            : c.key === 'database'
            ? '#4479A1'
            : c.key === 'systems'
            ? '#14B8A6'
            : c.key === 'engineering'
            ? '#A855F7'
            : '#F05032',
        radius: 32,
      }))

    const skillNodes: GraphNode[] = skills.map((s) => ({
      id: `skill-${s.name}`,
      name: s.name,
      type: 'skill',
      category: s.category,
      color: s.color,
      tagline: s.tagline,
      icon: s.icon,
      radius: 24,
    }))

    const nodes: GraphNode[] = [...hubs, ...skillNodes]

    // Restore cached positions so nodes never jump to top-left (0,0)
    nodes.forEach((n) => {
      if (nodeCoordsRef.current[n.id]) {
        n.x = nodeCoordsRef.current[n.id].x
        n.y = nodeCoordsRef.current[n.id].y
        n.vx = nodeCoordsRef.current[n.id].vx
        n.vy = nodeCoordsRef.current[n.id].vy
      }
    })

    // Prepare Links
    const links: GraphLink[] = skills.map((s) => ({
      source: `hub-${s.category}`,
      target: `skill-${s.name}`,
    }))

    // Filter visibility if activeCategory is selected
    const filteredNodeIds = new Set(
      nodes
        .filter((n) => activeCategory === 'all' || n.category === activeCategory)
        .map((n) => n.id)
    )

    // Force Simulation Setup with Strong Centering & Gentle Repulsion
    const simulation = d3
      .forceSimulation<GraphNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(70)
          .strength(0.3)
      )
      .force('charge', d3.forceManyBody().strength(-90))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.8))
      .force('x', d3.forceX(width / 2).strength(0.12))
      .force('y', d3.forceY(height / 2).strength(0.12))
      .force(
        'collision',
        d3.forceCollide<GraphNode>().radius((d) => d.radius + 10)
      )

    // Render Container Layer
    const g = svg.append('g')

    // Add Zoom / Pan Capability
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.7, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Render Links
    const link = g
      .append('g')
      .attr('stroke-opacity', 0.4)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => {
        const targetNode = nodes.find((n) => n.id === (typeof d.target === 'object' ? d.target.id : d.target))
        return targetNode?.color || '#3ECFCF'
      })
      .attr('stroke-width', 1.8)
      .attr('stroke-dasharray', '4, 4')

    // Accurate Drag Handler constrained strictly inside SVG box boundaries
    const dragHandler = d3
      .drag<SVGGElement, GraphNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        const [pointerX, pointerY] = d3.pointer(event, svgRef.current)
        d.fx = Math.max(d.radius + 10, Math.min(width - d.radius - 10, pointerX))
        d.fy = Math.max(d.radius + 10, Math.min(height - d.radius - 10, pointerY))
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    // OUTER node group: handles ONLY translate(x,y) — updated by simulation tick
    const outerNode = g
      .append('g')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodes)
      .join('g')
      .style('cursor', 'grab')
      .style('opacity', (d) => (filteredNodeIds.has(d.id) ? 1 : 0.2))
      .call(dragHandler)

    // INNER node group inside each outer: handles ONLY scale() for hover animation
    const innerNode = outerNode
      .append('g')
      .attr('class', 'inner-scale')

    // Hub / Node Outer Glow — drawn inside innerNode so scale affects visuals only
    innerNode
      .append('circle')
      .attr('r', (d) => d.radius + 4)
      .attr('fill', 'none')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', (d) => (d.type === 'hub' ? 2.5 : 1))
      .attr('stroke-opacity', 0.6)
      .style('filter', 'drop-shadow(0 0 8px rgba(245, 166, 35, 0.4))')

    // Main Circle Fill
    innerNode
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => (d.type === 'hub' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(9, 13, 22, 0.9)'))
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 2)

    // Node Text / Icon Label
    innerNode
      .append('text')
      .text((d) => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#FFFFFF')
      .attr('font-size', (d) => (d.type === 'hub' ? '12px' : '11px'))
      .attr('font-weight', (d) => (d.type === 'hub' ? '700' : '600'))
      .attr('font-family', 'var(--font-heading)')
      .style('pointer-events', 'none')

    // Click to select skill
    outerNode.on('click', (event, d) => {
      event.stopPropagation()
      if (d.type === 'hub') {
        onCategorySelect(d.category)
      } else {
        const found = skills.find((s) => s.name === d.name)
        if (found) setSelectedSkill(found)
      }
    })

    // Hover scales ONLY the innerNode — does NOT touch outerNode translate!
    outerNode.on('mouseenter', function () {
      d3.select(this).select('.inner-scale')
        .transition()
        .duration(200)
        .attr('transform', 'scale(1.15)')
    })

    outerNode.on('mouseleave', function () {
      d3.select(this).select('.inner-scale')
        .transition()
        .duration(200)
        .attr('transform', 'scale(1)')
    })

    // Simulation Ticks with Strict Boundary Clamping
    simulation.on('tick', () => {
      nodes.forEach((n) => {
        if (n.x && n.y) {
          // Clamp inside SVG canvas limits so nodes NEVER shoot upwards or escape!
          n.x = Math.max(n.radius + 15, Math.min(width - n.radius - 15, n.x))
          n.y = Math.max(n.radius + 15, Math.min(height - n.radius - 15, n.y))

          nodeCoordsRef.current[n.id] = { x: n.x, y: n.y, vx: n.vx || 0, vy: n.vy || 0 }
        }
      })

      link
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!)

      // Only outerNode gets translate — innerNode keeps its independent scale
      outerNode.attr('transform', (d) => `translate(${d.x ?? 0},${d.y ?? 0})`)
    })

    return () => {
      simulation.stop()
    }
  }, [skills, lang, activeCategory])

  return (
    <div className="d3-skills-wrapper" style={{ width: '100%', position: 'relative' }}>
      {/* Category Selection Filter Pills (Matching User Image Spec) */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <button
          className="btn-icon"
          title={isAr ? 'معلومات الشبكة' : 'Graph Info'}
        >
          i
        </button>

        {skillCategories.map((cat) => {
          const isActive = activeCategory === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => onCategorySelect(cat.key)}
              className={isActive ? 'btn btn-primary' : 'btn btn-outline'}
              style={{
                fontSize: '0.88rem',
                padding: '8px 20px',
              }}
            >
              {cat.label[lang]}
            </button>
          )
        })}
      </div>

      {/* D3 Canvas Container (Matching Unified Box System) */}
        <div
          ref={containerRef}
          style={{
            width: '100%',
            height: 'clamp(360px, 45vh, 480px)',
            borderRadius: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />

          {/* Floating Hint Legend */}
          <div
            style={{
              position: 'absolute',
              bottom: '14px',
              insetInlineStart: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.76rem',
              color: 'var(--text-muted)',
              background: 'var(--bg-secondary)',
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              pointerEvents: 'none',
              maxWidth: 'calc(100% - 28px)',
            }}
          >
            <Sparkles size={13} color="var(--copper)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isAr
                ? 'انقر واسحب العقد التفاعلية للاستكشاف بحرية'
                : 'Click & drag D3 nodes freely to explore'}
            </span>
          </div>
        </div>

      {/* Selected Skill Detail Solid Card */}
      {selectedSkill && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.5rem 1.75rem',
            borderRadius: '16px',
            background: 'var(--bg-card)',
            border: `1px solid ${selectedSkill.color}`,
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: `${selectedSkill.color}20`,
                border: `1px solid ${selectedSkill.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: selectedSkill.color,
                fontSize: '1.3rem',
              }}
            >
              {selectedSkill.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h4
                  style={{
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    margin: 0,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {selectedSkill.name}
                </h4>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '100px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    background: `${selectedSkill.color}20`,
                    color: selectedSkill.color,
                    border: `1px solid ${selectedSkill.color}50`,
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedSkill.category}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
                {selectedSkill.tagline[lang]}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--accent-cyan)',
              fontSize: '0.82rem',
              fontWeight: 700,
            }}
          >
            <Info size={15} />
            <span>
              {isAr ? 'تقنية معتمدة في مشاريعي' : 'Core production technology'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

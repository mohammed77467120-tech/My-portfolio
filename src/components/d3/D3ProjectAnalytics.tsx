import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { projects } from '../../data/projects'
import { PieChart } from 'lucide-react'

interface D3ProjectAnalyticsProps {
  lang: 'ar' | 'en'
}

export default function D3ProjectAnalytics({ lang }: D3ProjectAnalyticsProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const isAr = lang === 'ar'

  useEffect(() => {
    if (!svgRef.current) return

    // Calculate category breakdown
    const categoryCounts: Record<string, number> = {}
    projects.forEach((p) => {
      const cat = p.category
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    })

    const data = Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
      label:
        category === 'mobile'
          ? isAr
            ? 'تطبيقات الجوال'
            : 'Mobile Apps'
          : category === 'web'
          ? isAr
            ? 'تطبيقات الويب'
            : 'Web Apps'
          : category === 'fullstack'
          ? isAr
            ? 'مشاريع متكاملة'
            : 'Full-Stack'
          : category,
    }))

    const width = 320
    const height = 260
    const radius = Math.min(width, height) / 2 - 20

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.category))
      .range(['#F5A623', '#3ECFCF', '#646CFF', '#02569B', '#FF2D20'])

    const pie = d3
      .pie<(typeof data)[0]>()
      .value((d) => d.count)
      .sort(null)

    const arc = d3
      .arc<d3.PieArcDatum<(typeof data)[0]>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius)
      .cornerRadius(6)

    const arcs = svg
      .selectAll('.arc')
      .data(pie(data))
      .join('g')
      .attr('class', 'arc')
      .style('cursor', 'pointer')

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.category))
      .attr('stroke', 'var(--bg-primary)')
      .attr('stroke-width', 2)
      .style('transition', 'all 0.3s ease')

    arcs.on('mouseenter', function () {
      d3.select(this)
        .select('path')
        .transition()
        .duration(200)
        .attr('transform', 'scale(1.08)')
    })

    arcs.on('mouseleave', function () {
      d3.select(this).select('path').transition().duration(200).attr('transform', 'scale(1)')
    })

    // Center Label (Ensuring crisp visibility in light and dark mode)
    const centerGroup = svg.append('g').attr('text-anchor', 'middle')
    centerGroup
      .append('text')
      .attr('dy', '-0.2em')
      .style('fill', 'var(--text-primary)')
      .attr('font-size', '1.8rem')
      .attr('font-weight', '800')
      .attr('font-family', 'var(--font-heading)')
      .text(projects.length)

    centerGroup
      .append('text')
      .attr('dy', '1.2em')
      .style('fill', 'var(--text-secondary)')
      .attr('font-size', '0.78rem')
      .attr('font-weight', '600')
      .text(isAr ? 'مشروع مكتمل' : 'Total Projects')
  }, [lang])

  return (
    <div
      style={{
        padding: '1.5rem 1.75rem',
        borderRadius: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-strong)',
        backdropFilter: 'blur(16px)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--copper)',
          fontSize: '0.9rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}
      >
        <PieChart size={16} />
        <span>{isAr ? 'توزيع المشاريع والتخصصات (D3 Donut Chart)' : 'Project Tech Breakdown'}</span>
      </div>
      <svg ref={svgRef} />
    </div>
  )
}

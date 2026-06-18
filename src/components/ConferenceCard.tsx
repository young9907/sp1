import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ConferenceCardProps {
  id: string
  name: string
  year: number
  region: string
  fullName: string
  description: string
  paperCount?: number
}

export default function ConferenceCard({
  id,
  name,
  year,
  region,
  fullName,
  description,
  paperCount = 0
}: ConferenceCardProps) {
  const regionLabels: Record<string, string> = {
    US: '美国',
    EU: '欧洲',
    China: '中国',
    Global: '全球'
  }

  const colorClasses: Record<string, string> = {
    PharmaSUG: 'from-blue-600 to-blue-700',
    PharmaRug: 'from-emerald-600 to-emerald-700',
    CDISC: 'from-purple-600 to-purple-700',
    CMAC: 'from-orange-500 to-orange-600'
  }

  const gradientClass = colorClasses[name] || 'from-gray-600 to-gray-700'

  return (
    <Link to={`/conference/${id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
        <div className={`h-2 bg-gradient-to-r ${gradientClass}`} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{year} {regionLabels[region] || region}</p>
            </div>
            <span className="px-3 py-1 bg-neutral text-xs font-medium text-primary rounded-full">
              {paperCount > 0 ? `${paperCount} 篇论文` : '查看详情'}
            </span>
          </div>

          <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">{fullName}</h4>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{description}</p>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {year}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {regionLabels[region] || region}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-accent font-medium group-hover:underline">
              浏览会议资料
            </span>
            <ExternalLink className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>
    </Link>
  )
}

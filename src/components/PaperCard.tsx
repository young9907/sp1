import { FileText, Calendar, Tag, Download } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PaperCardProps {
  id: string
  title: string
  authors: string[]
  abstract: string
  tags: string[]
  publishedDate: string
  pdfUrl?: string
  conferenceName?: string
  showConference?: boolean
}

export default function PaperCard({
  id,
  title,
  authors,
  abstract,
  tags,
  publishedDate,
  pdfUrl,
  conferenceName,
  showConference = false
}: PaperCardProps) {
  return (
    <Link to={`/paper/${id}`} className="group block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
        <div className="p-6">
          {showConference && conferenceName && (
            <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded mb-3">
              {conferenceName}
            </span>
          )}

          <h3 className="text-lg font-serif font-bold text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mb-3">
            {authors.join(', ')}
          </p>

          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {abstract}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-dark/5 text-gray-600 text-xs rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {publishedDate}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-accent font-medium">
                <FileText className="w-4 h-4" />
                查看详情
              </span>
              {pdfUrl && (
                <a
                  href={`${import.meta.env.BASE_URL}${pdfUrl}`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-xs text-white font-medium px-2 py-1 bg-accent hover:bg-accent-dark rounded transition-colors"
                  title="下载 PDF"
                >
                  <Download className="w-3 h-3" />
                  PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

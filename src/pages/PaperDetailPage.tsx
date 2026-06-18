import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, ExternalLink, FileText, Presentation, Tag, ArrowRight, Download } from 'lucide-react'
import papers from '../data/papers.json'
import conferences from '../data/conferences.json'

export default function PaperDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const paper = papers.find(p => p.id === id)
  const conference = paper ? conferences.find(c => c.id === paper.conferenceId) : null

  if (!paper) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">论文未找到</h2>
          <Link to="/" className="text-accent hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  const relatedPapers = papers
    .filter(p => p.id !== paper.id && (
      p.conferenceId === paper.conferenceId ||
      p.tags.some(tag => paper.tags.includes(tag))
    ))
    .slice(0, 3)

  const regionLabels: Record<string, string> = {
    US: '美国',
    EU: '欧洲',
    China: '中国',
    Global: '全球'
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          {conference && (
            <>
              <Link
                to={`/category/${conference.name.toLowerCase()}`}
                className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                返回 {conference.name} 会议列表
              </Link>
              <Link
                to={`/conference/${conference.id}`}
                className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4 transition-colors text-sm"
              >
                {conference.name} {conference.year}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}

          <h1 className="text-2xl md:text-3xl font-serif font-bold leading-relaxed mb-6">
            {paper.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200 mb-6">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {paper.authors.join(', ')}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {paper.publishedDate}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {paper.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-sm rounded-full"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Abstract */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-xl font-serif font-bold text-primary mb-4">摘要</h2>
                <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
              </div>

              {/* Keywords */}
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-xl font-serif font-bold text-primary mb-4">关键词</h2>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="px-4 py-2 bg-neutral text-gray-700 text-sm rounded-lg"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Papers */}
              {relatedPapers.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h2 className="text-xl font-serif font-bold text-primary mb-6">相关论文</h2>
                  <div className="space-y-4">
                    {relatedPapers.map(related => (
                      <Link
                        key={related.id}
                        to={`/paper/${related.id}`}
                        className="block p-4 bg-neutral hover:bg-accent/5 rounded-lg transition-colors group"
                      >
                        <h3 className="font-medium text-primary group-hover:text-accent transition-colors line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {related.authors.join(', ')}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Conference Info */}
              {conference && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="font-semibold text-primary mb-4">会议信息</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">会议名称</span>
                      <p className="font-medium text-gray-800">{conference.fullName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">年份</span>
                      <p className="font-medium text-gray-800">{conference.year}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">地区</span>
                      <p className="font-medium text-gray-800">{regionLabels[conference.region] || conference.region}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">描述</span>
                      <p className="text-gray-700">{conference.description}</p>
                    </div>
                  </div>
                  <a
                    href={conference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    访问会议官网
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Resource Links */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-primary mb-4">资料下载</h3>
                <div className="space-y-3">
                  {paper.pdfUrl && (
                    <>
                      <a
                        href={`${import.meta.env.BASE_URL}${paper.pdfUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-neutral hover:bg-accent/5 rounded-lg transition-colors group"
                      >
                        <FileText className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">
                          在线查看论文
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                      </a>
                      <a
                        href={`${import.meta.env.BASE_URL}${paper.pdfUrl}`}
                        download
                        className="flex items-center gap-3 p-3 bg-accent hover:bg-accent-dark rounded-lg transition-colors group"
                      >
                        <Download className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium text-white">
                          下载 PDF
                        </span>
                        <span className="ml-auto text-xs text-white/80">PDF</span>
                      </a>
                    </>
                  )}
                  {paper.presentationUrl && (
                    <>
                      <a
                        href={`${import.meta.env.BASE_URL}${paper.presentationUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-neutral hover:bg-accent/5 rounded-lg transition-colors group"
                      >
                        <Presentation className="w-5 h-5 text-accent" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">
                          在线查看演示文稿
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                      </a>
                      <a
                        href={`${import.meta.env.BASE_URL}${paper.presentationUrl}`}
                        download
                        className="flex items-center gap-3 p-3 bg-primary hover:bg-primary-dark rounded-lg transition-colors group"
                      >
                        <Download className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium text-white">
                          下载演示文稿
                        </span>
                        <span className="ml-auto text-xs text-white/80">PDF</span>
                      </a>
                    </>
                  )}
                </div>
                {(!paper.pdfUrl && !paper.presentationUrl) && (
                  <p className="text-sm text-gray-500 mt-2">暂无下载资源</p>
                )}
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-primary mb-4">相关标签</h3>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => navigate(`/search?tag=${tag.toLowerCase()}`)}
                      className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-full hover:bg-accent/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, ExternalLink, FileText } from 'lucide-react'
import conferences from '../data/conferences.json'
import papers from '../data/papers.json'

export default function ConferenceCategoryPage() {
  const { name } = useParams<{ name: string }>()

  if (!name) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">会议分类未找到</h2>
          <Link to="/" className="text-accent hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  const categoryConferences = conferences.filter(c => c.name.toLowerCase() === name.toLowerCase())

  if (categoryConferences.length === 0) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">未找到 {name} 相关会议</h2>
          <Link to="/" className="text-accent hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  const categoryName = categoryConferences[0].name
  const categoryPapers = papers.filter(p => categoryConferences.some(c => c.id === p.conferenceId))

  const regionLabels: Record<string, string> = {
    US: '美国',
    EU: '欧洲',
    China: '中国',
    Global: '全球'
  }

  const getPaperCount = (conferenceId: string) => {
    return papers.filter(p => p.conferenceId === conferenceId).length
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>

          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">{categoryName} 会议资源</h1>
            <p className="text-blue-200 mb-4">浏览 {categoryName} 各年份会议的论文资料</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <Calendar className="w-4 h-4 text-accent" />
                {categoryConferences.length} 场会议
              </span>
              <span className="bg-accent px-3 py-1.5 rounded-lg font-medium">
                {categoryPapers.length} 篇论文
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Year Selection */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-600">选择年份：</span>
            <div className="flex flex-wrap gap-2">
              {categoryConferences.map(conf => (
                <Link
                  key={conf.id}
                  to={`/conference/${conf.id}`}
                  className="px-4 py-2 text-sm font-medium bg-neutral hover:bg-accent/10 text-gray-700 hover:text-accent rounded-lg transition-all border border-transparent hover:border-accent/30"
                >
                  {conf.year} {regionLabels[conf.region] || conf.region}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conference Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryConferences.map(conf => (
              <Link to={`/conference/${conf.id}`} className="group block">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-700" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
                          {conf.name} {conf.year}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{regionLabels[conf.region] || conf.region}</p>
                      </div>
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                        {getPaperCount(conf.id)} 篇论文
                      </span>
                    </div>

                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">{conf.fullName}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{conf.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {conf.year}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-accent font-medium group-hover:underline">
                          浏览论文
                        </span>
                        <ExternalLink className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Papers from Category */}
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-1">{categoryName} 全部论文</h2>
              <p className="text-gray-600">展示 {categoryName} 各年份会议的所有论文</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPapers.map(paper => {
              const conf = conferences.find(c => c.id === paper.conferenceId)
              return (
                <Link to={`/paper/${paper.id}`} key={paper.id} className="group block">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                    <div className="p-6">
                      {conf && (
                        <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded mb-3">
                          {conf.name} {conf.year}
                        </span>
                      )}

                      <h3 className="text-lg font-serif font-bold text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
                        {paper.title}
                      </h3>

                      <p className="text-sm text-gray-500 mb-3">
                        {paper.authors.join(', ')}
                      </p>

                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {paper.abstract}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {paper.publishedDate}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-accent font-medium">
                          <FileText className="w-4 h-4" />
                          查看详情
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

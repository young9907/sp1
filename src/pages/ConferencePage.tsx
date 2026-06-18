import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, ExternalLink, Filter } from 'lucide-react'
import { useState, useMemo } from 'react'
import PaperCard from '../components/PaperCard'
import TagFilter from '../components/TagFilter'
import conferences from '../data/conferences.json'
import papers from '../data/papers.json'
import tags from '../data/tags.json'

export default function ConferencePage() {
  const { id } = useParams<{ id: string }>()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const conference = conferences.find(c => c.id === id)

  const conferencePapers = useMemo(() => {
    let filtered = papers.filter(p => p.conferenceId === id)

    if (selectedTags.length > 0) {
      filtered = filtered.filter(paper =>
        paper.tags.some(tag => selectedTags.includes(tag.toLowerCase()))
      )
    }

    return filtered
  }, [id, selectedTags])

  const availableTags = useMemo(() => {
    const paperTags = conferencePapers.flatMap(p => p.tags.map(t => t.toLowerCase()))
    return tags.map(tag => ({
      ...tag,
      count: paperTags.filter(t => t === tag.id || t === tag.name.toLowerCase()).length
    })).filter(tag => tag.count > 0)
  }, [conferencePapers])

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    )
  }

  const handleClearTags = () => {
    setSelectedTags([])
  }

  if (!conference) {
    return (
      <div className="min-h-screen bg-neutral flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">会议未找到</h2>
          <Link to="/" className="text-accent hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

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
          <Link
            to={`/category/${conference.name.toLowerCase()}`}
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回 {conference.name} 会议列表
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">{conference.fullName}</h1>
              <p className="text-blue-200 mb-4">{conference.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-accent" />
                  {conference.year}
                </span>
                <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <MapPin className="w-4 h-4 text-accent" />
                  {regionLabels[conference.region] || conference.region}
                </span>
                <span className="bg-accent px-3 py-1.5 rounded-lg font-medium">
                  {conferencePapers.length} 篇论文
                </span>
              </div>
            </div>

            <a
              href={conference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              访问会议官网
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <TagFilter
                  tags={availableTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearAll={handleClearTags}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <Filter className="w-4 h-4" />
                  筛选标签 ({selectedTags.length})
                </button>

                {showMobileFilter && (
                  <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                    <TagFilter
                      tags={availableTags}
                      selectedTags={selectedTags}
                      onTagToggle={handleTagToggle}
                      onClearAll={handleClearTags}
                    />
                  </div>
                )}
              </div>

              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600">当前筛选:</span>
                  {selectedTags.map(tagId => {
                    const tag = tags.find(t => t.id === tagId)
                    return tag && (
                      <span
                        key={tagId}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                      >
                        {tag.name}
                        <button
                          onClick={() => handleTagToggle(tagId)}
                          className="hover:text-accent-dark"
                        >
                          ×
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={handleClearTags}
                    className="text-sm text-gray-500 hover:text-gray-700 ml-2"
                  >
                    清除
                  </button>
                </div>
              )}

              {/* Papers Grid */}
              {conferencePapers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {conferencePapers.map(paper => (
                    <PaperCard key={paper.id} {...paper} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <p className="text-gray-500 mb-4">暂无符合条件的论文</p>
                  <button
                    onClick={handleClearTags}
                    className="text-accent hover:underline"
                  >
                    清除筛选
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

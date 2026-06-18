import { useSearchParams, Link } from 'react-router-dom'
import { Search as SearchIcon, Filter, ArrowRight } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import PaperCard from '../components/PaperCard'
import TagFilter from '../components/TagFilter'
import conferences from '../data/conferences.json'
import papers from '../data/papers.json'
import tags from '../data/tags.json'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const tagParam = searchParams.get('tag') || ''

  const [searchInput, setSearchInput] = useState(query)
  const [selectedTags, setSelectedTags] = useState<string[]>(
    tagParam ? [tagParam] : []
  )
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  useEffect(() => {
    if (tagParam && !selectedTags.includes(tagParam)) {
      setSelectedTags([tagParam])
    }
  }, [tagParam])

  const searchResults = useMemo(() => {
    let results = [...papers]

    if (query.trim()) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(paper =>
        paper.title.toLowerCase().includes(lowerQuery) ||
        paper.abstract.toLowerCase().includes(lowerQuery) ||
        paper.authors.some(author => author.toLowerCase().includes(lowerQuery)) ||
        paper.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
      )
    }

    if (selectedTags.length > 0) {
      results = results.filter(paper =>
        paper.tags.some(tag => selectedTags.includes(tag.toLowerCase()))
      )
    }

    return results
  }, [query, selectedTags])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const newParams = new URLSearchParams(searchParams)
    if (searchInput.trim()) {
      newParams.set('q', searchInput)
    } else {
      newParams.delete('q')
    }
    setSearchParams(newParams)
  }

  const handleTagToggle = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(t => t !== tagId)
      : [...selectedTags, tagId]
    setSelectedTags(newTags)

    const newParams = new URLSearchParams(searchParams)
    if (newTags.length > 0) {
      newParams.set('tag', newTags[0])
    } else {
      newParams.delete('tag')
    }
    setSearchParams(newParams)
  }

  const handleClearTags = () => {
    setSelectedTags([])
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('tag')
    setSearchParams(newParams)
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* Search Header */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-serif font-bold mb-6">搜索论文</h1>

          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="输入标题、作者、关键词..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-32 py-4 text-base bg-white rounded-xl shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/30 text-gray-800 placeholder-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-colors"
              >
                搜索
              </button>
            </div>
          </form>

          {(query || selectedTags.length > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-blue-200 text-sm">搜索结果:</span>
              {query && (
                <span className="px-3 py-1 bg-white/10 text-sm rounded-full">
                  "{query}"
                </span>
              )}
              {selectedTags.map(tagId => {
                const tag = tags.find(t => t.id === tagId)
                return tag && (
                  <span
                    key={tagId}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-white text-sm rounded-full"
                  >
                    {tag.name}
                    <button onClick={() => handleTagToggle(tagId)}>×</button>
                  </span>
                )
              })}
              <span className="text-accent font-medium ml-2">
                {searchResults.length} 篇论文
              </span>
            </div>
          )}
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
                  tags={tags}
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
                      tags={tags}
                      selectedTags={selectedTags}
                      onTagToggle={handleTagToggle}
                      onClearAll={handleClearTags}
                    />
                  </div>
                )}
              </div>

              {/* Quick Conference Links */}
              <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-3">快速筛选会议:</h3>
                <div className="flex flex-wrap gap-2">
                  {conferences.map(conf => (
                    <Link
                      key={conf.id}
                      to={`/conference/${conf.id}`}
                      className="px-3 py-1.5 bg-neutral hover:bg-accent/10 text-sm text-gray-700 hover:text-accent rounded-lg transition-colors"
                    >
                      {conf.name} {conf.year}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Results */}
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map(paper => {
                    const conf = conferences.find(c => c.id === paper.conferenceId)
                    return (
                      <PaperCard
                        key={paper.id}
                        {...paper}
                        showConference
                        conferenceName={conf ? `${conf.name} ${conf.year}` : ''}
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">未找到相关论文</h3>
                  <p className="text-gray-500 mb-4">
                    请尝试其他关键词，或浏览以下内容：
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {conferences.map(conf => (
                      <Link
                        key={conf.id}
                        to={`/conference/${conf.id}`}
                        className="px-4 py-2 bg-accent/10 text-accent text-sm rounded-lg hover:bg-accent/20 transition-colors"
                      >
                        {conf.name} {conf.year}
                        <ArrowRight className="inline w-3 h-3 ml-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Search, BookOpen, Calendar, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ConferenceCard from '../components/ConferenceCard'
import PaperCard from '../components/PaperCard'
import conferences from '../data/conferences.json'
import papers from '../data/papers.json'
import tags from '../data/tags.json'

export default function HomePage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const latestPapers = papers.slice(0, 6)
  const popularTags = tags.filter(t => ['SDTM', 'ADaM', 'CDISC', 'SAS', 'R', 'Validation'].includes(t.name))

  const getPaperCount = (conferenceId: string) => {
    return papers.filter(p => p.conferenceId === conferenceId).length
  }

  return (
    <div className="min-h-screen bg-neutral">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              临床试验统计编程知识库
            </h1>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              汇集 PharmaSUG、PharmaRug、CDISC、CMAC 等行业会议资源，
              为 SAS 程序员和生物统计师提供一站式学习参考平台
            </p>

            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索论文标题、关键词或作者..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>{papers.length} 篇论文</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>{conferences.length} 场会议</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <span>持续更新中</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Navigation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">会议资源</h2>
            <p className="text-gray-600">选择行业会议，浏览相关论文资料</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {conferences.map(conf => (
              <ConferenceCard
                key={conf.id}
                {...conf}
                paperCount={getPaperCount(conf.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Papers */}
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-1">最新论文</h2>
              <p className="text-gray-600">来自各会议的最新技术分享</p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="px-4 py-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              查看全部 →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPapers.map(paper => {
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
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">热门主题</h2>
            <p className="text-gray-600">探索热门技术和领域</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map(tag => (
              <button
                key={tag.id}
                onClick={() => navigate(`/search?tag=${tag.id}`)}
                className="px-5 py-2.5 bg-neutral hover:bg-accent/10 text-primary hover:text-accent rounded-full transition-all font-medium shadow-sm hover:shadow-md"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-primary-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">关于知识库</h2>
            <p className="text-blue-200 leading-relaxed mb-6">
              本知识库整合了临床试验统计编程领域的核心会议资料，包括美国制药SAS用户组（PharmaSUG）、
              R语言用户组（PharmaRug）、CDISC标准组织以及中国医疗器械创新学术会议（CMAC）等。
              我们致力于为行业从业者提供便捷的资源获取渠道，促进知识传播与学术交流。
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-accent font-semibold">SDTM/ADaM</span>
                <span className="text-blue-200 ml-2">数据标准</span>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-accent font-semibold">SAS/R</span>
                <span className="text-blue-200 ml-2">统计编程</span>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg">
                <span className="text-accent font-semibold">CDISC</span>
                <span className="text-blue-200 ml-2">合规提交</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

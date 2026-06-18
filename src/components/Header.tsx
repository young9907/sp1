import { BookOpen, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold leading-tight">临床试验统计编程</h1>
              <p className="text-xs text-blue-200">知识库</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-accent transition-colors">首页</Link>
            <Link to="/category/pharmasug" className="text-sm hover:text-accent transition-colors">PharmaSUG</Link>
            <Link to="/category/pharmarug" className="text-sm hover:text-accent transition-colors">PharmaRug</Link>
            <Link to="/category/cdisc" className="text-sm hover:text-accent transition-colors">CDISC</Link>
            <Link to="/category/cmac" className="text-sm hover:text-accent transition-colors">CMAC</Link>
          </nav>

          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索论文..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm bg-primary-light rounded-lg border border-blue-700 focus:border-accent focus:outline-none w-48 placeholder-blue-300"
              />
            </div>
          </form>

          <button
            className="md:hidden p-2 hover:bg-primary-light rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700">
            <nav className="flex flex-col gap-2 mb-4">
              <Link to="/" className="px-3 py-2 text-sm hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>首页</Link>
              <Link to="/category/pharmasug" className="px-3 py-2 text-sm hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>PharmaSUG</Link>
              <Link to="/category/pharmarug" className="px-3 py-2 text-sm hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>PharmaRug</Link>
              <Link to="/category/cdisc" className="px-3 py-2 text-sm hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>CDISC</Link>
              <Link to="/category/cmac" className="px-3 py-2 text-sm hover:bg-primary-light rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>CMAC</Link>
            </nav>
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索论文..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-primary-light rounded-lg border border-blue-700 focus:border-accent focus:outline-none placeholder-blue-300"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}

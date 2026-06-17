import { Github, ExternalLink, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif font-bold mb-4">临床试验统计编程知识库</h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              汇集PharmaSUG、PharmaRug、CDISC、CMAC等行业会议的技术论文和资源，
              为临床试验统计编程专业人士提供一站式学习参考平台。
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-blue-200 hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">会议资源</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://pharmasug.org" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1">PharmaSUG <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://www.pharmarug.org" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1">PharmaRug <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://www.cdisc.org" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1">CDISC <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://www.cmac.org.cn" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1">CMAC <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-accent">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-blue-200 hover:text-white transition-colors">首页</Link></li>
              <li><Link to="/search" className="text-blue-200 hover:text-white transition-colors">搜索论文</Link></li>
              <li><a href="https://pharmasug.org/conferences/pharmasug-2026-us/conference-proceedings/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center gap-1">最新会议 <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-300">
          <p>© 2025 临床试验统计编程知识库. 基于公开会议资料整理，仅供学习参考。</p>
          <p className="mt-2">数据来源：PharmaSUG、PharmaRug、CDISC、CMAC 等行业会议官网</p>
        </div>
      </div>
    </footer>
  )
}

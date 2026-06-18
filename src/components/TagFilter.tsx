import { X } from 'lucide-react'

interface TagFilterProps {
  tags: Array<{
    id: string
    name: string
    category: string
    count: number
  }>
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
  onClearAll: () => void
}

export default function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  onClearAll
}: TagFilterProps) {
  const categories = [...new Set(tags.map(tag => tag.category))]

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">筛选标签</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-accent hover:text-accent-dark flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            清除全部
          </button>
        )}
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category}>
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags
                .filter(tag => tag.category === category)
                .map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => onTagToggle(tag.id)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                      selectedTags.includes(tag.id)
                        ? 'bg-accent text-white'
                        : 'bg-neutral text-gray-700 hover:bg-accent/10'
                    }`}
                  >
                    {tag.name}
                    <span className={`ml-1 text-xs ${selectedTags.includes(tag.id) ? 'text-white/70' : 'text-gray-400'}`}>
                      {tag.count}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  level: number;
}

interface SkillsFilterProps {
  skills: Record<string, string[]>;
}

export default function SkillsFilter({ skills }: SkillsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Convert skills object to array with categories
  const skillsArray: Skill[] = Object.entries(skills).flatMap(([category, skillList]) =>
    skillList.map(skill => ({
      name: skill,
      category,
      level: Math.floor(Math.random() * 3) + 3 // Random level 3-5 for demo
    }))
  );

  const categories = ['all', ...Object.keys(skills)];

  const filteredSkills = skillsArray.filter(skill => {
    const matchesFilter = activeFilter === 'all' || skill.category === activeFilter;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSkillColor = (category: string) => {
    const colors = {
      'Data Analysis': 'bg-blue-100 text-blue-800 border-blue-200',
      'Tools & Technologies': 'bg-green-100 text-green-800 border-green-200',
      'Soft Skills': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelBars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-1 w-4 rounded-full ${
          i < level ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Skills' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={`${skill.category}-${skill.name}-${index}`}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getSkillColor(skill.category)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm">{skill.name}</h4>
              <span className="text-xs opacity-75">{skill.category}</span>
            </div>
            <div className="flex items-center gap-1">
              {getLevelBars(skill.level)}
              <span className="text-xs ml-2 opacity-75">{skill.level}/5</span>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No skills found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('all');
            }}
            className="mt-2 text-indigo-600 hover:text-indigo-700 underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
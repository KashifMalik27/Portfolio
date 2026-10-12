'use client';

import { useMemo, useState } from 'react';
import SkillPhysicsField from './SkillPhysicsField';

export default function SkillsSearch({ groups }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [view, setView] = useState('interactive');

  const filteredSkills = useMemo(
    () => groups.flatMap((group) => group.skills
      .filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((skill) => ({ ...skill, category: group.category }))),
    [groups, searchTerm],
  );

  const filteredGroups = useMemo(
    () => groups.map((group) => ({
      ...group,
      skills: group.skills.filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
    })).filter((group) => group.skills.length > 0),
    [groups, searchTerm],
  );

  return (
    <section className={`skills-viewport ${view === 'interactive' ? 'is-interactive' : ''} mx-auto h-[calc(100svh-5rem)] w-full max-w-[1400px] overflow-hidden px-6 py-5 font-mona sm:py-6 lg:px-10`}>
      <div className="mx-auto flex h-full max-w-7xl min-h-0 flex-col">
        <h1 className="page-title mb-5 shrink-0 text-4xl sm:text-5xl">Skills &amp; Expertise</h1>

        <div className="mb-5 flex w-full shrink-0 flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="skills-view-toggle" role="group" aria-label="Skills display">
            <button type="button" className={view === 'interactive' ? 'is-active' : ''} aria-pressed={view === 'interactive'} onClick={() => setView('interactive')}>
              Interactive
            </button>
            <button type="button" className={view === 'categories' ? 'is-active' : ''} aria-pressed={view === 'categories'} onClick={() => setView('categories')}>
              By category
            </button>
          </div>
          <div className="w-full max-w-md">
            <label htmlFor="skills-search" className="sr-only">
              Search skills
            </label>
            <input
              id="skills-search"
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setSelectedSkill(null);
              }}
              className="field"
            />
          </div>
        </div>

        {filteredSkills.length > 0 ? (
          view === 'interactive' ? (
            <SkillPhysicsField
              skills={filteredSkills}
              selectedSkill={selectedSkill}
              onSelect={(nextSkill) => setSelectedSkill(selectedSkill?.name === nextSkill.name ? null : nextSkill)}
            />
          ) : (
            <div
              className="skills-category-view"
              data-lenis-prevent
              tabIndex="0"
              role="region"
              aria-label="Skills grouped by category"
            >
              {filteredGroups.map((group) => (
                <section key={group.category} className="skills-category-group">
                  <header className="skills-category-header">
                    <h2>{group.category}</h2>
                  </header>
                  <div className="skills-category-grid">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`skills-category-circle ${skill.name.length > 30 ? 'is-long' : ''}`}
                      >
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-1 items-center justify-center text-center">
            <p className="text-lg text-slate-400">No skills found matching &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { forwardRef } from 'react';
import SkillIcon from './SkillIcon';

const SkillCard = forwardRef(function SkillCard({ skill, isActive, onSelect }, ref) {
  return (
    <button
      type="button"
      ref={ref}
      className={`skill-bubble ${isActive ? 'is-active' : ''}`}
      aria-expanded={isActive}
      onClick={() => onSelect(skill)}
    >
      <span className="skill-bubble-float">
        <span className="skill-bubble-icon">
          <SkillIcon name={skill.icon} />
        </span>
        <span className="skill-bubble-name">{skill.name}</span>
        <span className="skill-bubble-details" aria-hidden={!isActive}>
          <span className="skill-bubble-category">{skill.category}</span>
          <span className="skill-bubble-description">{skill.description}</span>
        </span>
      </span>
    </button>
  );
});

export default SkillCard;

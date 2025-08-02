// src/components/ProjectCard.jsx

import './ProjectCard.css'

export default function ProjectCard({ title, link, description, tags }) {
  return (
    <a className="card" href={link} target="_blank" rel="noopener noreferrer">
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{description}</p>
      <div className="card-tags">
        {tags.map((tag, i) => (
          <span key={i} className="card-tag">{tag}</span>
        ))}
      </div>
    </a>
  )
}

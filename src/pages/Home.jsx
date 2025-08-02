import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import '../App.css'

export default function Home() {
  return (
    <main className="container">
      <h2 className="section-title">Projects</h2>
      <div className="grid">
        {projects.map((proj, i) => (
          <ProjectCard key={i} {...proj} />
        ))}
      </div>
    </main>
  )
}

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProjectCard from './components/ProjectCard'
import { projects } from './data/projects'
import PostGraph from './pages/PostGraph';
import React, { useState } from 'react';
import About from './pages/About'
import Resume from './pages/Resume';
import './App.css'

export default function App() {
  /*const [darkMode, setDarkMode] = useState(false);*/

  /*const toggleDarkMode = () => setDarkMode(!darkMode); */

  console.log("projects", projects)
  return (

    <Router basename="/my-project-site">
      <header className="container">
        <h1 className="site-title">Rebecca Harris</h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <a href="https://www.linkedin.com/in/rebecca-harris-846b711a7/"
          target="_blank"
          rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="container">

              <section id="projects">
                <h2 className="section-title">Projects</h2>
                <div className="grid">
                  {projects.map((proj, i) => (
                    <ProjectCard key={i} {...proj} />
                  ))}
                </div>
              </section>
            </main>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>

  )
}

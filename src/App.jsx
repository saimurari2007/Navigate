import { useState, useRef, createRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Search, Globe, CheckCircle, Loader2 } from 'lucide-react'

import './index.css'

const glass = 'bg-white/5 backdrop-blur-xl border border-white/10'
const glassDark = 'bg-black/5 backdrop-blur-xl border border-white/5'
const gradientStart = 'from-indigo-600 to-purple-600'
const gradientEnd = 'from-purple-600 to-indigo-600'

const screens = {
  landing: '/',
  profile: '/profile',
  dashboard: '/dashboard',
  research: '/research',
}

function LandingScreen({ navigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl text-center">
        <div className="inline-block mb-6">
          <svg className="w-12 h-12 text-indigo-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            <line x1="12" y1="11" x2="12" y2="17"></line>
          </svg>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">NAVIGATE</h1>
        <p className="text-indigo-300 text-lg mb-8">From Ambition to Action</p>
        <button 
          onClick={() => navigate('/profile')}
          className="rounded-xl py-3 px-6 font-medium gradient-bg text-white hover:opacity-90 transition-opacity"
        >
          Start Now
        </button>
      </div>
      <div className="absolute top-0 right-0 mt-8 mr-8 glass">
        <div className="p-4 rounded-xl {glass} min-w-[200px]">
          <h3 className="text-sm font-medium text-indigo-300 mb-2">How it Works</h3>
          <ol className="text-sm text-indigo-200 space-y-1">
            <li>Enter your ambition</li>
            <li>AI analyzes your goal</li>
            <li>Get a personalized roadmap</li>
            <li>Track your progress</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function ProfileScreen({ onSubmit }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    background: '',
    qualification: '',
    skills: '',
    experience: '',
    location: '',
    ambition: '',
  })

  const [ambition, setAmbition] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'ambition') {
      setAmbition(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, ambition })
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <ul className="flex space-x-4 text-indigo-300">
            <li><Link to="/">Landing</Link></li>
            <li className="relative"><Link to="/profile">Profile & Goal</Link><span className="absolute -bottom-1 w-3 h-1 bg-indigo-500 rounded-full"></span></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/research">Research</Link></li>
          </ul>
        </nav>

        <div className="glass p-6 md:p-8 rounded-2xl mt-8">
          <h2 className="text-3xl font-bold gradient-text mb-4">Tell Us Your Ambition</h2>
          <p className="text-indigo-300 text-sm mb-6">Help us understand your goals and background to generate a personalized roadmap.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Educational/Professional Background</label>
                <textarea 
                  name="background" 
                  value={form.background} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 resize-none transition-colors h-20"
                  placeholder="e.g., Computer Science student, Software Engineer, etc."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Current Qualification</label>
                <input 
                  type="text" 
                  name="qualification" 
                  value={form.qualification} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 transition-colors"
                  placeholder="e.g., B.Sc., M.Sc., High School, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-1">Skills</label>
                <textarea 
                  name="skills" 
                  value={form.skills} 
                  onChange={handleChange} 
                  required 
                  className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 resize-none transition-colors h-20"
                  placeholder="e.g., Python, JavaScript, Machine Learning, Leadership, etc."
                ></textarea>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-300 mb-1">Experience</label>
              <textarea 
                name="experience" 
                value={form.experience} 
                onChange={handleChange} 
                required 
                className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 resize-none transition-colors h-20"
                placeholder="e.g., 2 years of experience, internship, student projects, etc."
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-indigo-300 mb-1">Location</label>
              <input 
                type="text" 
                name="location" 
                value={form.location} 
                onChange={handleChange} 
                required 
                className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 transition-colors"
                placeholder="e.g., New York, USA or Remote"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-indigo-300 mb-1">Ambition / Goal</label>
              <p className="text-indigo-300 text-sm mb-1 small-help">
                Describe what you want to achieve (e.g., "I want to secure an AI/ML internship")
              </p>
              <textarea 
                name="ambition" 
                value={form.ambition || ''} 
                onChange={(e) => setAmbition(e.target.value)} 
                required 
                className="w-full rounded-xl p-3 bg-black/5 border border-white/10 focus:outline-none focus:border-indigo-400 resize-none transition-colors h-20"
                placeholder="I want to secure an AI/ML internship..."
              ></textarea>
            </div>
            <button type="submit" className="w-full rounded-xl py-3 px-4 font-medium gradient-bg text-white hover:opacity-90 transition-opacity">
              Generate Roadmap
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function DashboardScreen({ roadmap, onTaskComplete }) {
  const navigate = useNavigate()

  const totalTasks = roadmap?.tasks?.length || 0
  const completedTasks = roadmap?.tasks?.filter(t => t.completed).length || 0
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <nav className="mb-6">
        <ul className="flex space-x-4 text-indigo-300">
          <li><Link to="/">Landing</Link></li>
          <li className="relative"><Link to="/profile">Profile & Goal</Link><span className="absolute -bottom-1 w-3 h-1 bg-indigo-500 rounded-full"></span></li>
          <li className="relative"><Link to="/dashboard">Dashboard</Link><span className="absolute -bottom-1 w-3 h-1 bg-indigo-500 rounded-full"></span></li>
          <li><Link to="/research">Research</Link></li>
        </ul>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="glass p-6 md:p-8 rounded-2xl mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Search className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">Your Ambition</h2>
              <p className="text-indigo-300 line-clamp-2">{/* ambition text will be inserted here */}</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 md:p-8 rounded-2xl">
          <h2 className="text-2xl font-bold gradient-text mb-6">Personalized Roadmap</h2>
          {roadmap ? (
            <div className="space-y-4">
              {roadmap.tasks.map((task, index) => (
                <div key={index} className="glass p-4 rounded-xl border border-white/10 transition-all hover:border-indigo-400/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-indigo-500/20 text-indigo-400">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{task.title}</h3>
                      <p className="text-indigo-300 text-sm mt-1 line-clamp-2">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTaskComplete(index)}
                        className="rounded-lg p-1.5 hover:bg-indigo-500/20 transition-colors"
                        aria-label="Mark task as completed"
                      >
                        <CheckCircle className="w-4 h-4 text-indigo-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-indigo-300 text-sm">Generate a roadmap first by completing your profile and ambition input.</p>
          )}
        </div>

        <div className="mt-6">
          <div className="glass p-4 rounded-xl mb-3">
            <div className="text-xl font-medium gradient-text">{completedTasks}</div>
            <div className="text-indigo-300 text-xs">Completed</div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-width"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-indigo-300 text-xs">{progressPercentage}%</div>
          </div>

          <div className="glass p-4 rounded-xl">
            <div className="text-xl font-medium gradient-text">{totalTasks}</div>
            <div className="text-indigo-300 text-xs">Total Tasks</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResearchScreen({ researchResults }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <nav className="mb-6">
        <ul className="flex space-x-4 text-indigo-300">
          <li><Link to="/">Landing</Link></li>
          <li className="relative"><Link to="/profile">Profile & Goal</Link><span className="absolute -bottom-1 w-3 h-1 bg-indigo-500 rounded-full"></span></li>
          <li className="relative"><Link to="/dashboard">Dashboard</Link><span className="absolute -bottom-1 w-3 h-1 bg-indigo-500 rounded-full"></span></li>
          <li className="relative"><Link to="/research">Research</Link><span className="absolute -bottom-1 w-3 h-1 bg-indigo-500 rounded-full"></span></li>
        </ul>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="glass p-6 md:p-8 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold gradient-text">Research Results</h2>
          <p className="text-indigo-300 text-sm mb-6">Relevant websites and opportunities for your goal.</p>
        </div>

        {researchResults.length === 0 ? (
          <div className="glass p-8 rounded-2xl text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-indigo-400" />
            <p className="text-indigo-300">No results yet. Generate a roadmap first to discover relevant resources.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchResults.map((result) => (
              <div key={result.id} className="glass p-5 rounded-xl hover:border-indigo-400 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{result.title}</h3>
                    <p className="text-indigo-300 text-sm mt-1 line-clamp-2">{result.description}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-400 text-sm hover:underline transition-colors"
                  >
                    View Source →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function GlassButton({ variant = "default", children, className, onClick }) {
  const bgClass = variant === "primary" ? 'gradient-bg' : 'indigo-600'
  const textClass = variant === "primary" ? 'text-white' : 'text-white'
  
  return (
    <button 
      onClick={onClick}
      className={`rounded-xl py-3 px-4 font-medium ${bgClass} ${textClass} hover:opacity-90 transition-opacity ${className}`} 
    >
      {children}
    </button>
  )
}

function useAIAnalysis() {
  const analyze = async (profile, ambition) => {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ profile, ambition }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'AI analysis failed')
    }

    return response.json()
  }

  const research = async (goal) => {
    const response = await fetch('/api/research', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal }),
    })

    if (!response.ok) {
      throw new Error('Research failed')
    }

    return response.json()
  }

  return { analyze, research }
}

export default function App() {
  const [roadmap, setRoadmap] = useState(null)
  const [researchResults, setResearchResults] = useState([])
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0 })
  const [ambition, setAmbition] = useState('')

  const navigate = useNavigate()
  const { analyze, research } = useAIAnalysis()
  const ambitionRef = createRef()

  const handleProfileSubmit = async (formData) => {
    setRoadmap(null)
    setResearchResults([])
    setProgress({ completed: 0, total: 0, percentage: 0 })

    try {
      const analysis = await analyze(formData, ambition)
      
      if (analysis.roadmap && analysis.roadmap.tasks) {
        setRoadmap(analysis.roadmap)
        setProgress({
          completed: 0,
          total: analysis.roadmap.tasks.length,
          percentage: 0,
        })
      }
    } catch (error) {
      console.error('Error analyzing goal:', error)
    }
  }

  const handleTaskComplete = (taskIndex) => {
    setRoadmap(prev => {
      if (!prev) return prev
      const updatedTasks = prev.tasks.map((task, i) =>
        i === taskIndex ? { ...task, completed: true } : task
      )
      const completed = updatedTasks.filter(t => t.completed).length
      const total = updatedTasks.length
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
      setProgress(prev => ({ ...prev, completed, total, percentage }))
      return { ...prev, tasks: updatedTasks }
    })
  }

  const handleResearch = async () => {
    if (!roadmap) return
    
    try {
      const goal = ambition || 'personal goal'
      const results = await research(goal)
      setResearchResults(results)
    } catch (error) {
      console.error('Error performing research:', error)
    }
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingScreen navigate={navigate} />} />
          <Route path="/profile" element={<ProfileScreen onSubmit={handleProfileSubmit} />} />
          <Route path="/dashboard" element={<DashboardScreen roadmap={roadmap} onTaskComplete={handleTaskComplete} />} />
          <Route path="/research" element={<ResearchScreen researchResults={researchResults} />} />
        </Routes>
      </div>
    </Router>
  )
}
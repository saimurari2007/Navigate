require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

// Check for API key
if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not set. Using mock mode.')
}

app.use(cors())
app.use(express.json())

// API: AI Goal Analysis with Gemini
app.post('/api/analyze', async (req, res) => {
  const { profile, ambition } = req.body

  if (!profile || !ambition) {
    return res.status(400).json({ error: 'Profile and ambition are required' })
  }

  try {
    // Import Gemini API
    const { GoogleGenerativeAI } = require('@google/generative-ai')

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
      You are an AI goal navigation assistant. Analyze the user's ambition and profile to generate a personalized roadmap.

      USER PROFILE:
      ${JSON.stringify(profile)}

      USER AMBITION:
      ${ambition}

      Please provide a structured JSON response with:
      1. "primaryGoal": The user's main goal
      2. "requiredQualifications": Required qualifications for this goal
      3. "importantSkills": Key skills needed
      4. "skillGaps": Identified skill gaps
      5. "expectedSteps": Numbered list of steps to achieve the goal
      6. "relevantResources": Relevant websites, opportunities, or resources
      7. "roadmapTasks": Array of tasks with title, description, priority, timeline, and completionCriteria

      Format the roadmapTasks as an array of objects, each containing:
      - title: string
      - description: string
      - priority: "High" | "Medium" | "Low"
      - timeline: string (e.g., "2 weeks", "1 month", "3 months")
      - completionCriteria: string

      Return ONLY valid JSON. No explanatory text before or after.
    `

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Clean up the response to ensure it's valid JSON
    let jsonResponse
    try {
      jsonResponse = JSON.parse(responseText)
    } catch (e) {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\\{[\s\\S]*\\}/)
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Could not parse AI response as JSON')
      }
    }

    res.json(jsonResponse)
  } catch (error) {
    console.error('AI Analysis Error:', error)
    res.status(500).json({ error: 'Failed to analyze goal with AI' })
  }
})

// API: Web Research
app.post('/api/research', async (req, res) => {
  const { goal, profile } = req.body

  if (!goal) {
    return res.status(400).json({ error: 'Goal is required' })
  }

  try {
    // In a full implementation, this would use a search API
    // For now, we'll return structured mock data based on the goal
    const researchResults = generateResearchResults(goal, profile)
    res.json(researchResults)
  } catch (error) {
    console.error('Research Error:', error)
    res.status(500).json({ error: 'Failed to perform web research' })
  }
})

function generateResearchResults(goal, profile) {
  // Mock research results based on common goals
  const goalLower = goal.toLowerCase()

  if (goalLower.includes('internship') || goalLower.includes('ai/ml internship')) {
    return [
      {
        id: 1,
        title: 'AI/ML Internship Opportunities',
        description: 'Find internships at top tech companies',
        url: 'https://internshala.com/internships/ai-ml',
      },
      {
        id: 2,
        title: 'Google AI Internship Program',
        description: 'Official Google AI internship opportunities',
        url: 'https://careers.google.com/jobs/search/results/?q=AI%20Intern',
      },
      {
        id: 3,
        title: 'AI/ML Scholarships and Grants',
        description: 'Funding opportunities for AI/ML education',
        url: 'https://fastweb.com/scholarships/ai',
      },
    ]
  }

  if (goalLower.includes('startup') || goalLower.includes('start a business')) {
    return [
      {
        id: 1,
        title: 'Startup Resources and Guides',
        description: 'Official guidance on starting a business',
        url: 'https://www.sba.gov/business-guide/plan/startup',
      },
      {
        id: 2,
        title: 'Startup School',
        description: 'Free entrepreneurship program',
        url: 'https://startupschool.org/',
      },
      {
        id: 3,
        title: 'Business Incubators',
        description: 'Local startup incubator opportunities',
        url: 'https://www.nst.gov.business-incubators',
      },
    ]
  }

  if (goalLower.includes('study abroad') || goalLower.includes('study')) {
    return [
      {
        id: 1,
        title: 'Study Abroad Scholarships',
        description: 'Scholarship opportunities for international study',
        url: 'https://www.iesabroad.org/scholarships',
      },
      {
        id: 2,
        title: 'University Exchange Programs',
        description: 'Exchange program opportunities',
        url: 'https://www.echange.org/programs',
      },
      {
        id: 3,
        title: 'Student Visa Information',
        description: 'Visa requirements for international students',
        url: 'https://travel.state.gov/content/travel.html',
      },
    ]
  }

  // Default generic results
  return [
    {
      id: 1,
      title: 'Resources for Your Goal',
      description: 'General resources related to your ambition',
      url: 'https://www.google.com/search?q=' + encodeURIComponent(goal),
    },
    {
      id: 2,
      title: 'Opportunities Database',
      description: 'Browse relevant opportunities and programs',
      url: 'https://www.coursera.org/search?query=' + encodeURIComponent(goal),
    },
    {
      id: 3,
      title: 'Professional Associations',
      description: 'Industry organizations and networks',
      url: 'https://www.linkedin.com/search/results/all/',
    },
  ]
}

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'NAVIGATE API is running' })
})

app.listen(PORT, () => {
  console.log(`NAVIGATE API server running on port ${PORT}`)
})
import { useState } from 'react'
import '../styles/Home.css'

// Mock evaluation data
const mockEvaluation = {
  name: 'Luminary',
  overallScore: 84,
  domain: { available: true, tld: '.com' },
  social: {
    twitter: true,
    instagram: false,
    linkedin: true,
    status: 'partial'
  },
  trademark: { risk: 'low', conflicts: 0 },
  pronunciation: { score: 92, difficulty: 'easy' },
  international: { issues: 0, languages: 12 },
  aiInsight: "Luminary evokes enlightenment, leadership, and innovation. The name suggests a guiding light or influential figure, making it ideal for consulting, education, or thought leadership brands. It has strong positive connotations across cultures and is memorable without being overused in the tech space."
}

export default function HomePage() {
  const [brandName, setBrandName] = useState('Luminary')
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleEvaluate = () => {
    if (!brandName.trim()) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEvaluate()
  }

  // Calculate score ring offset (circumference = 2 * PI * 22 ≈ 138.2)
  const scoreOffset = 138.2 - (138.2 * mockEvaluation.overallScore / 100)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Brand Intelligence Platform</div>
          <h1>
            <span className="gradient-text">Evaluate Names</span>
            <br />
            <span className="highlight">Before You Commit</span>
          </h1>
          <p className="hero-subtitle">
            Domain availability. Social handles. Trademark risk. Pronunciation.
            International appeal. AI-powered brand perception analysis.
            All in one automated scorecard.
          </p>
          <div className="hero-cta">
            <a href="#demo" className="btn-primary">Try It Free</a>
            <a href="/thesis" className="btn-secondary">Read the Thesis</a>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo" id="demo">
        <div className="demo-container">
          <div className="demo-header">
            <h2>Evaluate a Brand Name</h2>
            <p>Enter any name to see its full evaluation scorecard</p>
          </div>

          <div className="demo-input-group">
            <input
              type="text"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value)
                setShowResults(false)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter a brand name..."
              className="demo-input"
            />
            <button
              onClick={handleEvaluate}
              className="demo-button"
              disabled={isLoading || !brandName.trim()}
            >
              {isLoading ? 'Analyzing...' : 'Evaluate'}
            </button>
          </div>

          {showResults && (
            <div className="eval-results">
              <div className="eval-header">
                <span className="eval-name">{mockEvaluation.name}</span>
                <div className="eval-score">
                  <div className="score-ring">
                    <svg viewBox="0 0 48 48">
                      <circle className="score-ring-bg" cx="24" cy="24" r="22" />
                      <circle
                        className={`score-ring-fill ${mockEvaluation.overallScore >= 80 ? 'success' : mockEvaluation.overallScore >= 60 ? 'gold' : ''}`}
                        cx="24"
                        cy="24"
                        r="22"
                        style={{ strokeDashoffset: scoreOffset }}
                      />
                    </svg>
                    <span className="score-value">{mockEvaluation.overallScore}</span>
                  </div>
                </div>
              </div>

              <div className="eval-grid">
                <div className="eval-metric">
                  <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <div className="metric-label">Domain</div>
                  <div className={`metric-value ${mockEvaluation.domain.available ? 'available' : 'unavailable'}`}>
                    {mockEvaluation.domain.available ? `${mockEvaluation.domain.tld} Available` : 'Taken'}
                  </div>
                </div>

                <div className="eval-metric">
                  <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  <div className="metric-label">Social Handles</div>
                  <div className={`metric-value ${mockEvaluation.social.status === 'partial' ? 'partial' : mockEvaluation.social.twitter ? 'available' : 'unavailable'}`}>
                    2/3 Available
                  </div>
                </div>

                <div className="eval-metric">
                  <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div className="metric-label">Trademark</div>
                  <div className={`metric-value ${mockEvaluation.trademark.risk === 'low' ? 'available' : 'partial'}`}>
                    Low Risk
                  </div>
                </div>

                <div className="eval-metric">
                  <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                  </svg>
                  <div className="metric-label">Pronunciation</div>
                  <div className="metric-value available">
                    {mockEvaluation.pronunciation.score}/100
                  </div>
                </div>

                <div className="eval-metric">
                  <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <div className="metric-label">International</div>
                  <div className="metric-value available">
                    {mockEvaluation.international.languages} Languages OK
                  </div>
                </div>

                <div className="eval-metric">
                  <svg className="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <div className="metric-label">Memorability</div>
                  <div className="metric-value available">
                    High
                  </div>
                </div>
              </div>

              <div className="eval-ai-section">
                <div className="ai-header">
                  <span className="ai-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    AI Analysis
                  </span>
                  <span className="ai-label">Brand Perception Insight</span>
                </div>
                <div className="ai-insight">
                  {mockEvaluation.aiInsight}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Complete Brand Intelligence</h2>
        <p>
          Everything you need to evaluate a brand name before committing.
          Automated checks that would take hours, done in seconds.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3>Domain & Social Availability</h3>
            <p>
              Check .com, .io, .co and 20+ TLDs. Verify Twitter, Instagram,
              LinkedIn, TikTok handles. Get alternatives if taken.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>Trademark Risk Analysis</h3>
            <p>
              Search USPTO, EUIPO, and international trademark databases.
              Identify potential conflicts before they become lawsuits.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
              </svg>
            </div>
            <h3>Pronunciation Score</h3>
            <p>
              Phonetic analysis for ease of spelling and pronunciation.
              Test across different accents and language backgrounds.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3>International Check</h3>
            <p>
              Detect embarrassing meanings in other languages.
              Cultural sensitivity analysis for global expansion.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>AI Perception Analysis</h3>
            <p>
              LLM-powered brand perception testing. "What does this name evoke?"
              "Does it align with our mission?" Automated at scale.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3>Automated Scorecard</h3>
            <p>
              One unified score combining all factors. Compare candidates
              side-by-side. Export reports for stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Names</h3>
            <p>
              Input your brand name candidates or let AI generate suggestions
              based on your company's mission and values.
            </p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Run Evaluation</h3>
            <p>
              Our system checks domains, social handles, trademarks, pronunciation,
              and runs AI perception analysis automatically.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Compare & Decide</h3>
            <p>
              Review the unified scorecard, compare candidates side-by-side,
              and make data-driven naming decisions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Name Your Brand with Confidence</h2>
        <p>
          Stop guessing. Start evaluating. Get the full picture before you commit.
        </p>
        <div className="cta-buttons">
          <a href="#demo" className="btn-primary">Try It Free</a>
          <a href="/thesis" className="btn-secondary">Read the Thesis</a>
        </div>
      </section>
    </div>
  )
}

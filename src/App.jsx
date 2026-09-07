import { useEffect, useRef } from 'react'
import ProjectStudies from './ProjectStudies'
import './App.css'

const noiseData = [
  { text: '12.81%', x: '5%', y: '15%', size: '22px', depth: 1 },
  { text: 'customer_id', x: '76%', y: '12%', size: '12px', depth: 3 },
  { text: '€37,425', x: '18%', y: '76%', size: '17px', depth: 2 },
  { text: 'Net Sales', x: '83%', y: '70%', size: '15px', depth: 2 },
  { text: '4.66%', x: '58%', y: '84%', size: '25px', depth: 1 },
  { text: 'ORDER_58392', x: '3%', y: '48%', size: '11px', depth: 3 },
  { text: 'EBITDA', x: '89%', y: '36%', size: '16px', depth: 2 },
  { text: '62.4%', x: '31%', y: '22%', size: '24px', depth: 1 },
  { text: 'delivery_days', x: '69%', y: '43%', size: '12px', depth: 3 },
  { text: 'SELECT *', x: '37%', y: '90%', size: '12px', depth: 3 },
  { text: 'revenue', x: '54%', y: '10%', size: '14px', depth: 2 },
  { text: 'seller_id', x: '10%', y: '88%', size: '11px', depth: 3 },

  { text: 'P&L', x: '92%', y: '81%', size: '13px', depth: 3 },
  { text: 'Power Query', x: '7%', y: '31%', size: '13px', depth: 2 },
  { text: 'SAP', x: '22%', y: '9%', size: '11px', depth: 3 },
  { text: 'cost_centre', x: '72%', y: '79%', size: '11px', depth: 3 },
  { text: 'variance', x: '45%', y: '18%', size: '13px', depth: 2 },
  { text: 'review_score', x: '81%', y: '53%', size: '13px', depth: 2 },

  { text: 'JOIN', x: '16%', y: '57%', size: '18px', depth: 1 },
  { text: 'GROUP BY', x: '65%', y: '27%', size: '12px', depth: 3 },
  { text: 'CTE', x: '94%', y: '19%', size: '12px', depth: 3 },
  { text: 'ROW_NUMBER()', x: '38%', y: '68%', size: '11px', depth: 3 },
  { text: 'pandas', x: '48%', y: '93%', size: '14px', depth: 2 },
  { text: 'cohort', x: '25%', y: '42%', size: '13px', depth: 2 },

  { text: 'logistic regression', x: '74%', y: '92%', size: '11px', depth: 3 },
  { text: 'repeat_purchase', x: '4%', y: '67%', size: '11px', depth: 3 },
  { text: 'late_delivery', x: '87%', y: '61%', size: '12px', depth: 2 },
  { text: 'freight_value', x: '59%', y: '58%', size: '11px', depth: 3 },
  { text: 'basket_size', x: '29%', y: '84%', size: '11px', depth: 3 },
  { text: 'seller_count', x: '13%', y: '20%', size: '11px', depth: 3 },

  { text: 'Power BI', x: '94%', y: '48%', size: '13px', depth: 2 },
  { text: 'Tableau', x: '34%', y: '6%', size: '12px', depth: 3 },
  { text: 'Python', x: '67%', y: '69%', size: '14px', depth: 2 },
  { text: 'SQL', x: '19%', y: '94%', size: '16px', depth: 2 },
  { text: 'forecasting', x: '84%', y: '25%', size: '11px', depth: 3 },
  { text: 'business KPI', x: '43%', y: '77%', size: '12px', depth: 3 },

  { text: '96,478 orders', x: '2%', y: '79%', size: '12px', depth: 2 },
  { text: '95,824 reviews', x: '78%', y: '6%', size: '12px', depth: 2 },
  { text: '8.23×', x: '56%', y: '31%', size: '19px', depth: 1 },
]

const experience = [
  {
    dates: 'SEP 2021 — JAN 2024', company: 'TD SYNNEX', role: 'Accounts Payable Specialist',
    paragraphs: [
      'Validated purchase-to-pay data in a high-volume multinational environment using SAP, Excel and Power Query, working directly with suppliers and internal teams.',
      'Built a VBA automation project to process incidents much faster, improving the department’s efficiency and reducing repetitive manual work.',
    ],
    lesson: 'My first step from processing information to improving how it flows.',
  },
  {
    dates: 'JAN 2024 — SEP 2025', company: 'Laboratorios Hartmann', role: 'Controlling & Accounting Technician',
    paragraphs: [
      'Worked on budgets, cost-centre variances, month-end closing and business KPIs. Automated recurring reporting with Power Query and Power BI.',
      'Contributed to the transition to SAP HANA and built Controlling reports with SQL and Power BI, including reports to check compliance with promotional campaigns for adhesive bandages.',
      'Helped implement AI in the finance department. I also hold a letter of recommendation from the company’s CFO.',
    ],
    lesson: 'Connecting finance, technology and the people making decisions.',
  },
  {
    dates: 'NOV 2025 — MAR 2026', company: 'BlueSun', role: 'Reporting Analyst',
    paragraphs: [
      'Prepared financial and sales reporting for management: Net Sales, EBITDA, P&L and daily performance. Cleaned and transformed SAP extracts in Power Query and modelled dashboards in Power BI.',
      'This short experience deepened my understanding of relational databases, how the company’s P&L was structured, and how different information sources feed the calculation of costs and revenue.',
    ],
    lesson: 'Understanding where a result comes from, not just how to report it.',
  },
  {
    dates: 'MAR — SEP 2026', company: 'Independent learning · Barcelona', role: 'Data Analytics Formation',
    paragraphs: [
      'A full-time, self-directed move into SQL, Python / pandas, statistics, data modelling and visualisation.',
      'Applying that foundation to customer experience, repeat purchase and commercial performance through the Olist and Chinook projects.',
    ],
    lesson: 'Bringing business experience to new analytical questions.',
  },
]

// Seeded randomness: scattered, repeatable positions without a visible grid.
function randomUnit(seed) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}
const DATA_COUNT = 320
const denseData = Array.from({ length: DATA_COUNT }, (_, index) => ({
  text: noiseData[index % noiseData.length].text,
  x: `${1 + randomUnit(index + 1) * 92}%`,
  y: `${2 + randomUnit(index + 601) * 94}%`,
  depth: 1 + index % 3,
  size: `${12 + randomUnit(index + 1201) * 12}px`,
  rank: (((index * 53) % DATA_COUNT) + 1) / DATA_COUNT,
  duration: `${12 + randomUnit(index + 1801) * 15}s`,
  delay: `${-randomUnit(index + 2401) * 28}s`,
  driftX: `${(randomUnit(index + 3001) - .5) * 90}px`,
  driftY: `${(randomUnit(index + 3601) - .5) * 75}px`,
  tilt: `${(randomUnit(index + 4201) - .5) * 12}deg`,
}))
const clamp = (value) => Math.max(0, Math.min(1, value))

function useClarityScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    // Percentages refer to words removed, not a dimming of the whole layer.
    const landmarks = [
      ['#about', .10], ['#career-0', .10], ['#career-1', .15],
      ['#career-2', .20], ['#career-3', .25],
      ['#olist', .50], ['#chinook', .70], ['#contact', 1],
    ].map(([selector, amount]) => ({ element: root.querySelector(selector), amount }))
    const titles = [...root.querySelectorAll('[data-decode]')].map((title) => ({
      title,
      letters: [...title.querySelectorAll('[data-letter]')],
    }))
    const contact = root.querySelector('#contact')
    const particles = [...root.querySelectorAll('.dataAtmosphere > .noise')]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    // Anchor navigation is intentional: never replace it with the closing jump.
    // Only a fresh manual scroll can enable that jump again.
    let allowContactSnap = true
    const onAnchorClick = (event) => {
      if (event.target.closest('a[href^="#"]')) allowContactSnap = false
    }
    const onManualScroll = (event) => {
      if (event.type === 'keydown') {
        if (event.target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return
        if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) return
      }
      allowContactSnap = true
    }
    let frame = 0
    let previousContactTop = contact.getBoundingClientRect().top
    let contactSnapArmed = previousContactTop > window.innerHeight * 1.35
    const paint = () => {
      frame = 0
      const viewport = window.innerHeight
      const scroll = Math.max(0, -root.getBoundingClientRect().top)
      const maxScroll = Math.max(1, root.offsetHeight - viewport)
      const points = [{ position: 0, amount: 0 }, ...landmarks.map(({ element, amount }) => ({
        position: Math.min(maxScroll, Math.max(1, element.getBoundingClientRect().top + scroll - viewport * .35)), amount,
      }))]
      let cleared = points.at(-1).amount
      for (let index = 1; index < points.length; index++) {
        const previous = points[index - 1]
        const next = points[index]
        if (scroll <= next.position) {
          const progress = clamp((scroll - previous.position) / Math.max(1, next.position - previous.position))
          cleared = previous.amount + (next.amount - previous.amount) * progress
          break
        }
      }
      // A restrained glow follows scrolling, rather than running on a timer.
      const light = reduced.matches ? 0 : Math.pow(Math.max(0, Math.sin(scroll / viewport * 2.3)), 8) * .45
      root.style.setProperty('--scroll-light', String(light))
      // Set actual opacity so disappearance does not depend on CSS arithmetic support.
      particles.forEach((particle, index) => {
        // Overlapping fade windows replace the previous almost-instant 1/320 fade.
        const start = denseData[index].rank * .82
        const fade = clamp((cleared - start) / .18)
        const opacity = 1 - fade * fade * (3 - 2 * fade)
        particle.style.opacity = String(opacity)
      })
      const contactTop = contact.getBoundingClientRect().top
      // Enter the closing screen before its heading reaches the viewport.
      // Rearm only after returning well above it, so scrolling back stays free.
      if (contactTop > viewport * 1.6) contactSnapArmed = true
      if (!reduced.matches && allowContactSnap && contactSnapArmed && contactTop < previousContactTop && contactTop <= viewport * 1.35 && contactTop > 0) {
        contactSnapArmed = false
        contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      contact.dataset.arrived = String(reduced.matches || contactTop < viewport * .06)
      previousContactTop = contactTop
      contact.dataset.revealed = String(reduced.matches || contactTop < viewport * .06)
      titles.forEach(({ title, letters }) => {
        const ownProgress = clamp((viewport * .96 - title.getBoundingClientRect().top) / (viewport * .34))
        const phaseProgress = clamp((viewport * .88 - title.closest('.journeyRow').getBoundingClientRect().top) / (viewport * .46))
        const progress = reduced.matches ? 1 : Math.max(ownProgress, phaseProgress)
        letters.forEach((letter, index) => {
          const resolved = progress >= (index + 1) / letters.length
          const alphabet = 'aenrstuv024679·+~/'
          const value = resolved ? letter.dataset.letter : alphabet[(index * 7 + Math.floor(progress * 18)) % alphabet.length]
          if (letter.textContent !== value) letter.textContent = value
          letter.dataset.resolved = String(resolved)
        })
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
    const observer = new ResizeObserver(schedule)
    observer.observe(root)
    root.addEventListener('click', onAnchorClick, true)
    window.addEventListener('wheel', onManualScroll, { passive: true })
    window.addEventListener('touchmove', onManualScroll, { passive: true })
    window.addEventListener('keydown', onManualScroll)
    document.addEventListener('scroll', schedule, { passive: true, capture: true })
    window.addEventListener('resize', schedule)
    reduced.addEventListener('change', schedule)
    paint()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      root.removeEventListener('click', onAnchorClick, true)
      window.removeEventListener('wheel', onManualScroll)
      window.removeEventListener('touchmove', onManualScroll)
      window.removeEventListener('keydown', onManualScroll)
      document.removeEventListener('scroll', schedule, true)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', schedule)
    }
  }, [rootRef])
}

function DecodeText({ text, as: Tag = 'p', className = '' }) {
  return <Tag className={className} data-decode><span className="srOnly">{text}</span>{text.split(' ').map((word, wordIndex) =>
    <span className="decodeWord" aria-hidden="true" key={wordIndex}>
      {Array.from(word).map((letter, index) => <span className="decodeGlyph" key={index}><span>{letter}</span><b data-letter={letter}>{letter}</b></span>)}{' '}
    </span>
  )}</Tag>
}

function App() {
  const rootRef = useRef(null)
  useClarityScroll(rootRef)
  return (
    <main className="site" id="top" ref={rootRef}>
      <div className="dataAtmosphere" aria-hidden="true">
        {denseData.map((item, index) => <span key={index} className={`noise depth${item.depth}`} style={{ left: item.x, top: item.y, fontSize: item.size, '--drift-duration': item.duration, '--drift-delay': item.delay, '--drift-x': item.driftX, '--drift-y': item.driftY, '--tilt': item.tilt }}><span>{item.text}</span></span>)}
      </div>
      <section className="hero" aria-labelledby="hero-title">
        <nav className="nav" aria-label="Main navigation">
          <a className="logo" href="#top" aria-label="Nelson Rivera — home">NR.</a>
          <div className="navLinks"><a href="#about">About</a><a href="#journey">Journey</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div>
        </nav>
        <div className="heroContent">
          <p className="eyebrow">NELSON RIVERA · DATA & BUSINESS ANALYTICS</p>
          <h1 id="hero-title">They’re not<br /><span className="numbers">just numbers.</span></h1>
          <p className="description">I’m Nelson, an Economics graduate moving from finance and reporting into Business & Product Data Analytics.</p>
          <a className="textLink" href="#about">Get to know me <span aria-hidden="true">↓</span></a>
        </div>
        <p className="bottomText">BUSINESS CONTEXT. ANALYTICAL CURIOSITY.</p>
      </section>

      <section className="contentSection aboutSection" id="about" aria-labelledby="about-title">
        <p className="eyebrow">01 / THE PERSON BEHIND THE NUMBERS</p>
        <div className="editorialGrid">
          <h2 id="about-title">My starting point<br />is the business.</h2>
          <div className="prose">
            <p>For around four years, I’ve worked with the numbers businesses run on: budgets, sales, costs and performance reports.</p>
            <p>That experience taught me to check the data, understand the process behind it and listen to the people who need the answer.</p>
            <p>Now I’m building on that foundation with SQL, Python and statistics to explore customer behaviour and support business and product decisions.</p>
            <p className="careerDirection">Looking for junior opportunities in Business & Product Data Analytics.</p>
          </div>
        </div>
      </section>

      <section className="contentSection" id="journey" aria-labelledby="journey-title">
        <p className="eyebrow">02 / FROM FINANCE TO ANALYTICS</p>
        <h2 id="journey-title">The questions have evolved.</h2>
        <div className="journey">
          {experience.map((job, index) => (
            <article className="journeyRow" id={`career-${index}`} key={job.company}>
              <DecodeText className="dateLabel" text={job.dates} />
              <div className="jobContent">
                <p className="companyName">{job.company}</p>
                <DecodeText as="h3" className="decodeTitle" text={job.role} />
                {job.paragraphs.map((paragraph) => <DecodeText key={paragraph} text={paragraph} />)}
                <DecodeText className="lesson" text={job.lesson} />
                {index === 3 && <a className="textLink" href="#projects">See the work ↓</a>}
              </div>
            </article>
          ))}
        </div>
        <div className="education">
          <p className="eyebrow">THE QUANTITATIVE FOUNDATION</p>
          <div><h3>Economics · Universitat Pompeu Fabra</h3><p className="dateLabel">2017 — 2021</p><p>Advanced Quantitative Methods certificate: econometrics, statistics, forecasting and modelling, with practical work in R, Stata and Python.</p></div>
        </div>
      </section>

      <section className="contentSection projectsSection" id="projects" aria-labelledby="projects-title">
        <p className="eyebrow">03 / PUTTING IT INTO PRACTICE</p>
        <h2 id="projects-title">From reporting performance<br />to understanding behaviour.</h2>
        <p className="projectPurpose">I built these personal projects during my Data Analytics Formation to demonstrate practical Python and SQL skills: from preparing data and writing queries to interpreting results in a business context.</p>
        <div className="projectJump"><a href="#olist">01 · Olist / Python ↘</a><a href="#chinook">02 · Chinook / SQL ↘</a></div>
        <ProjectStudies />
        <a className="textLink contactInvitation" href="#contact">Let’s talk <span aria-hidden="true">↓</span></a>
      </section>
      <section className="contentSection contactSection" id="contact" aria-labelledby="contact-title">
        <div className="contactStatement">
        <p className="eyebrow">04 / LET’S CONNECT</p>
        <h2 id="contact-title">Behind the numbers,<br />there’s a conversation.</h2>
        <p className="contactIntro">Based in Barcelona. Open to junior opportunities in Business & Product Data Analytics.</p>
        </div>
        <div className="contactLinks">
          <a href="https://www.linkedin.com/in/nelson-r-607a0913a/"><span>LinkedIn</span><span>Connect with me ↗</span></a>
          <a href="mailto:nelson.rivera.linkedIn@gmail.com"><span>Email</span><span>Let’s talk ↗</span></a>
          <a href="/Nelson-Rivera-CV.pdf" download><span>Curriculum vitae</span><span>Download PDF ↓</span></a>
          <a href="https://github.com/NelsonRivera28"><span>GitHub</span><span>Explore my work ↗</span></a>
        </div>
      <footer className="footer"><a className="logo" href="#top">NR. ↑</a><p>Barcelona · Spanish & Catalan native · English C1</p></footer>
      </section>
    </main>
  )
}

export default App

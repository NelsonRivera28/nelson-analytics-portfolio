import { useState } from 'react'

const olistRepo = 'https://github.com/NelsonRivera28/Olist-Customer-Analysis'
const chinookRepo = 'https://github.com/NelsonRivera28/Chinook-Database-Analysis'
const evidence = [
  { label: '01 · Compare', headline: 'On time. Still a different experience.', metric: '46.92%', caption: 'low reviews for multi-seller orders', body: 'Among on-time orders with multiple products, the rate was 22.23% for a single seller. Multi-seller orders were actually delivered faster on average: 8.47 vs 10.28 days.', footnote: '1,249 multi-seller and 1,795 single-seller orders. Average basket sizes: 2.18 vs 2.16 products. Descriptive comparison, not a causal estimate.', values: [['Single seller',22.23],['Multiple sellers',46.92]], unit: '%', max: 100 },
  { label: '02 · Adjust', headline: 'The seller signal survives the controls.', metric: '4.22×', caption: 'adjusted odds of a low review', body: 'The final logistic model accounts for lateness, delivery duration, basket size, categories, order value, freight ratio and payment instalments. Multiple sellers still stand out.', footnote: '91,030 observations · 95% confidence interval: 3.55–5.01. Odds are not probabilities; this is not a 4.22× increase in risk.', values: [['Single seller · reference',1],['Multiple sellers',4.217]], unit: '×', max: 5 },
  { label: '03 · Challenge', headline: 'It is not just a handful of extreme orders.', metric: '4.16×', caption: 'adjusted odds after excluding extremes', body: 'Excluding orders above the 99th percentile of delivery duration and order value barely changes the multi-seller association: 4.22× becomes 4.16×.', footnote: 'Sensitivity check from the final model. Unobserved factors remain; package-level incidents and customer-support data are unavailable.', values: [['Final model',4.217],['Without extreme orders',4.161]], unit: '×', max: 5 },
]
const pythonSkills = [
  ['pandas', 'Built order-level and customer-level analytical datasets using merges, groupby aggregations, date conversion and first-order selection.'],
  ['Feature engineering', 'Created delivery delays, seller and product counts, value bands and a 365-day repeat-purchase outcome.'],
  ['Cohorts', 'Restricted repeat-purchase analysis to eligible customers with enough observation time, instead of treating recent customers as non-returners.'],
  ['statsmodels', 'Fitted logistic regressions, interpreted odds ratios and confidence intervals, and repeated the analysis after excluding extreme observations.'],
  ['Matplotlib', 'Visualised delivery-delay segments, seller comparisons and repeat-purchase patterns to communicate the business findings.'],
]
const sqlViews = [
  { label: 'Markets', headline: 'Five markets account for 58.78% of revenue.', takeaway: 'Revenue is concentrated. A high average ticket alone is not enough to prioritise a market: Chile has the highest ticket, but only seven invoices.', rows: [['USA',523.06],['Canada',303.96],['France',195.10],['Brazil',190.10],['Germany',156.48]], max: 550, skill: 'GROUP BY · SUM · COUNT · AVG', file: '02_sales_overview.sql', code: 'SELECT BillingCountry,\n       SUM(Total) AS revenue,\n       COUNT(*) AS invoices\nFROM Invoice\nGROUP BY BillingCountry\nORDER BY revenue DESC;' },
  { label: 'Music genres', headline: 'Four genres generate 73.51% of revenue.', takeaway: 'Rock leads with 35.50%. I connected invoice lines to tracks and genres, then used a window total to calculate each genre’s contribution.', rows: [['Rock',826.65],['Latin',382.14],['Metal',261.36],['Alternative & Punk',241.56]], max: 850, skill: 'JOIN · CTE · SUM() OVER()', file: '04_product_genre_analysis.sql', code: 'SELECT\n    genero,\n    ROUND(total_facturado, 2),\n    ROUND(total_facturado /\n      SUM(total_facturado) OVER() * 100, 2)\nFROM facturacion_genero\nORDER BY total_facturado DESC;' },
  { label: 'Over time', headline: 'A monthly jump is not a long-term growth story.', takeaway: 'December 2023 rose 58.33% month on month, following a November decline. Across five years, annual revenue stayed between $449.46 and $481.45.', rows: [['2021',449.46],['2022',481.45],['2023',469.58],['2024',477.53],['2025',450.58]], max: 550, skill: 'LAG() · SUM() OVER() · PARTITION BY', file: '05_temporal_analysis.sql', code: 'SELECT\n    mes,\n    ventas,\n    LAG(ventas) OVER (ORDER BY mes)\n      AS ventas_mes_anterior\nFROM facturacion_mensual;' },
]
const sqlSkills = [
  ['JOIN / LEFT JOIN', 'Connected invoices, tracks, albums, artists and genres. LEFT JOIN kept unsold catalogue tracks in revenue-per-track analysis.'],
  ['CTEs', 'Split customer rankings, genre revenue shares and monthly comparisons into readable intermediate query steps.'],
  ['Window functions', 'Used ROW_NUMBER for the best customer per country, LAG for monthly comparisons and SUM / AVG OVER for cumulative totals and local benchmarks.'],
  ['Data accuracy', 'Used COUNT(DISTINCT) to avoid duplicated counts and COALESCE to retain zero-revenue items.'],
  ['CASE / dates', 'Segmented customers by spending, identified dormant customers and labelled increases or decreases in monthly revenue.'],
]

function Skills({ items, name }) {
  const [selected, setSelected] = useState(0)
  return <div className="skillsExplorer"><p className="controlLabel">Explore my {name} skills</p><div className="skillButtons">{items.map(([label], index) => <button type="button" key={label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>)}</div><p className="skillDetail" aria-live="polite">{items[selected][1]}</p></div>
}
function Bars({ rows, max, unit = '$' }) {
  return <div className="resultBars">{rows.map(([label,value]) => <div className="barRow" key={label}><div><span>{label}</span><strong>{unit === '$' ? '$' : ''}{value.toFixed(2)}{unit === '$' ? '' : unit}</strong></div><div className="barTrack" aria-hidden="true"><div style={{width: `${value / max * 100}%`}} /></div></div>)}</div>
}
export default function ProjectStudies() {
  const [finding, setFinding] = useState(0)
  const [query, setQuery] = useState(0)
  const current = evidence[finding]
  const sql = sqlViews[query]
  return <>
    <article className="project olistProject" id="olist" aria-labelledby="olist-title">
      <header className="caseHeading"><span className="caseIndex">01</span><div><p className="eyebrow">PYTHON / CUSTOMER EXPERIENCE</p><h3 id="olist-title">Olist<span>Beyond the delivery date.</span></h3></div><a className="sourceLink" href={olistRepo}>View notebooks ↗</a></header>
      <p className="projectIntro">My Python project, built during my Data Analytics Formation. Using data from Olist, a Brazilian e-commerce marketplace, I combined orders, customers, sellers and reviews to investigate dissatisfaction and repeat purchase.</p>
      <p className="projectQuestion">If an order arrives on time, what else might go wrong?</p>
      <div className="segmentedControls" aria-label="Explore Olist evidence">{evidence.map((item,index) => <button type="button" key={item.label} aria-pressed={finding === index} onClick={() => setFinding(index)}>{item.label}</button>)}</div>
      <div className="evidencePanel" aria-live="polite">
        <div><h4>{current.headline}</h4><p className="bigMetric">{current.metric}</p><p className="metricCaption">{current.caption}</p></div>
        <div><Bars rows={current.values} max={current.max} unit={current.unit}/><p>{current.body}</p></div>
        <p className="evidenceNote">{current.footnote}</p>
      </div>
      <p className="businessMeaning"><span>What I would investigate next</span> Whether split deliveries, missing items or communication gaps explain the multi-seller experience. This is a targeted investigation, not a proven mechanism. Multi-seller orders represent only 1.32% of reviewed orders, so reach matters as well as severity.</p>
      <Skills items={pythonSkills} name="Python" />
      <p className="sourceNote">Source: <a href={`${olistRepo}/blob/main/notebooks/03_customer_dissatisfaction_drivers.ipynb`}>saved comparisons and final model</a>. Low reviews = scores 1–2; delivered, reviewed orders only. Associations, not causality.</p>
    </article>
    <div className="projectBridge"><span>CUSTOMER EXPERIENCE</span><span aria-hidden="true">↓</span><span>COMMERCIAL PERFORMANCE</span></div>
    <article className="project chinookProject" id="chinook" aria-labelledby="chinook-title">
      <header className="caseHeading"><span className="caseIndex">02</span><div><p className="eyebrow">SQL / MUSIC STORE ANALYTICS</p><h3 id="chinook-title">Chinook<span>Follow the revenue.</span></h3></div><a className="sourceLink" href={chinookRepo}>View SQL ↗</a></header>
      <p className="projectIntro">My SQL project, built during my Data Analytics Formation. Using Chinook, a sample digital music store with 412 invoices and $2,328.60 in revenue, I wrote queries to explore markets, customers and catalogue performance.</p>
      <div className="queryPath" aria-label="Example relationship used in genre analysis"><span>InvoiceLine</span><b aria-hidden="true">→</b><span>Track</span><b aria-hidden="true">→</b><span>Genre</span></div>
      <p className="controlLabel">Choose a business question</p>
      <div className="segmentedControls" aria-label="Explore Chinook results">{sqlViews.map((item,index) => <button type="button" key={item.label} aria-pressed={query === index} onClick={() => setQuery(index)}>{item.label}</button>)}</div>
      <div className="sqlPanel" aria-live="polite"><div><p className="toolLine">{sql.skill}</p><h4>{sql.headline}</h4><p>{sql.takeaway}</p><details><summary>See the SQL logic</summary><p className="sourceNote">Condensed illustration of the repository query; results shown here are saved findings.</p><pre><code>{sql.code}</code></pre><a href={`${chinookRepo}/blob/main/${sql.file}`}>Open the complete query ↗</a></details></div><Bars rows={sql.rows} max={sql.max}/></div>
      <Skills items={sqlSkills} name="SQL" />
      <p className="sourceNote">Source: <a href={`${chinookRepo}/blob/main/INSIGHTS.md`}>Chinook analysis findings</a> · Sample database, not a live business dashboard.</p>
    </article>
  </>
}

/**
 * Single source of truth for the portfolio.
 *
 * Sources: Suraj_Madane_Resume.pdf and the public repositories at github.com/SurajM80
 * (READMEs, notebooks, SQL files and dashboard screenshots). Anything that could not be
 * verified there is left out. Where the resume and a repository differ, the comment says so.
 */

export const profile = {
  name: 'Suraj Madane',
  fullName: 'Suraj Shankar Madane',
  headline: 'Data, Engineering & AI.',
  intro:
    'I build data pipelines, analytics dashboards and AI-powered workflows that turn complex problems into practical outcomes.',
  degreeShort: 'B.Tech CSE — AI & Data Science',
  location: 'Pune, India',
  email: 'surajmadane8392@gmail.com',
  links: {
    github: 'https://github.com/SurajM80',
    linkedin: 'https://www.linkedin.com/in/surajmadane80/',
  },
  resume: {
    href: '/Suraj_Madane_Resume.pdf',
    fileName: 'Suraj_Madane_Resume.pdf',
  },
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export const highlights = [
  { label: 'Education', value: 'B.Tech CSE (AI & DS)', detail: 'Pimpri Chinchwad University · CGPA 8.3' },
  { label: 'Experience', value: 'Two internships', detail: 'CCTech · Skillfield Mentors' },
  { label: 'Focus', value: 'Data engineering & analytics', detail: 'With applied ML and agentic AI' },
  { label: 'Work', value: 'ETL, BI & ML projects', detail: 'Public on GitHub' },
];

export const about = {
  paragraphs: [
    "I'm a Computer Science Engineering student at Pimpri Chinchwad University, Pune, specialising in Artificial Intelligence & Data Science and graduating in 2027. My work sits where data engineering, analytics and applied AI meet.",
    "Most of my projects start with a concrete business question — where are deliveries running late, which regions drive demand, what is trending today — and work back to the data needed to answer it: pulling it from APIs or raw files, cleaning and modelling it with SQL and Python, and presenting it in dashboards people can explore.",
    'Through two internships I have applied this in practice: exploratory analysis and reporting at Skillfield Mentors, and business-process automation with Zoho Desk and LangChain at CCTech. I learn best by building, and I am currently going deeper into machine learning and retrieval-augmented generation.',
  ],
  facts: [
    { label: 'Based in', value: 'Pune, Maharashtra, India' },
    { label: 'Studying', value: 'B.Tech CSE — AI & Data Science, 2023–2027' },
    { label: 'Interested in', value: 'Data analytics, data engineering, ML and AI roles' },
  ],
};

export type Experience = {
  company: string;
  role: string;
  team?: string;
  location?: string;
  period: string;
  summary: string;
  points: string[];
  tools: string[];
};

export const experience: Experience[] = [
  {
    company: 'CCTech',
    role: 'Agentic AI Intern',
    team: 'Internal Digital Transformation Team',
    period: 'Jun 2026 – Jul 2026',
    summary: 'Moving internal processes off spreadsheets and into a managed platform, while exploring LLM-based automation.',
    points: [
      'Worked on an automation framework for internal business processes.',
      'Helped migrate manual Excel-based workflows into Zoho Desk as a centralised database and process-management platform.',
      'Collaborated with stakeholders to understand departmental requirements and translate workflows into automated system designs.',
      'Explored LangChain, agentic workflow design and LLM-based automation concepts.',
    ],
    tools: ['Zoho Desk', 'LangChain', 'Excel'],
  },
  {
    company: 'Skillfield Mentors',
    role: 'Data Science Intern',
    period: 'May 2025 – Jul 2025',
    summary: 'Analysed datasets and supported internal reporting with Python and Excel.',
    points: [
      'Conducted exploratory data analysis on high-dimensional datasets with Python to identify key variance drivers.',
      'Used Pandas, Matplotlib and Seaborn for data processing and visualisation.',
      'Used Excel and Python to identify a 15% improvement in the accuracy of internal reporting.',
    ],
    tools: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Excel'],
  },
  {
    company: 'Bada Business',
    role: 'Independent Business Associate',
    location: 'Pune',
    period: 'Mar 2023 – Mar 2024',
    summary: 'Contributed to revenue generation, with a peak contribution of nearly ₹200K.',
    points: [],
    tools: [],
  },
];

export type Area = 'engineering' | 'analytics' | 'ml';

export const areaLabels: Record<Area, string> = {
  engineering: 'Data Engineering',
  analytics: 'Analytics & BI',
  ml: 'Machine Learning',
};

export type Project = {
  id: string;
  title: string;
  /** Short label shown under the title, e.g. the dataset or source. */
  context: string;
  year: string;
  areas: Area[];
  summary: string;
  problem: string;
  approach: string[];
  /** Results that are visible in the repository or stated on the resume. */
  outcomes: string[];
  stack: string[];
  repo: string;
  /** The main file in the repository — shown when there is no screenshot. */
  primaryFile: string;
  image?: { base: string; alt: string; width: number; height: number };
  note?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'streaming-etl',
    title: 'ETL Pipeline & BI Dashboard',
    context: 'Live trending-movie data from the TMDB REST API',
    year: '2026',
    areas: ['engineering', 'analytics'],
    featured: true,
    summary:
      'A Python pipeline that pulls daily trending-movie data from a REST API, loads it into MySQL safely on every run, and feeds a Power BI dashboard.',
    problem:
      'Trending data from a public API changes every day. Analysing it needs a repeatable way to collect it, store it without duplicates, and report on it.',
    approach: [
      'Python script requests the TMDB trending-movies endpoint and paginates across up to 50 pages per run.',
      'Nested JSON is flattened into a structured table; missing release dates are handled and dates and floats are typed explicitly.',
      'MySQL table keyed on movie_id; INSERT IGNORE keeps daily re-runs from failing on duplicate keys.',
      'A follow-up run re-fetches any pages skipped on the first pass, so gaps are filled without reloading everything.',
      'Power BI connects directly to MySQL: KPI cards, a top-10 ranking, a popularity-vs-rating scatter plot and a release-date trend.',
    ],
    outcomes: [
      'The dashboard reports 751 unique titles collected by the pipeline.',
      'The popularity-vs-rating view shows that high popularity does not reliably mean high ratings.',
    ],
    stack: ['Python', 'REST API', 'Pandas', 'MySQL', 'Power BI'],
    repo: 'https://github.com/SurajM80/End-to-End-Streaming-Analytics-Pipeline',
    primaryFile: 'Python_Scripts/TMDB_Data_Pipeline.ipynb',
    // The resume mentions SQLAlchemy for this project; the public notebook uses mysql-connector-python.
    image: { base: '/projects/streaming-etl', alt: 'Power BI dashboard with KPI cards, a top-10 trending movies bar chart, a popularity vs rating scatter plot and a release-date histogram', width: 1280, height: 708 },
  },
  {
    id: 'olist-supply-chain',
    title: 'Supply Chain Analysis',
    context: 'Brazilian e-commerce (Olist), 99K+ orders',
    year: '2026',
    areas: ['analytics'],
    featured: true,
    summary:
      'SQL analysis of 99K+ e-commerce orders to find where deliveries run late, with a Power BI dashboard for the operations view.',
    problem:
      'Customer complaints about shipping delays were growing, and it was unclear whether delays were a nationwide problem or concentrated in specific regions.',
    approach: [
      'Cleaned raw timestamp text in MySQL with STR_TO_DATE and NULLIF so missing delivery dates no longer broke the conversion.',
      'Joined orders with customer locations and flagged late deliveries with CASE logic (delivered after the estimated date).',
      'Calculated late-delivery percentage by state for states with 1,000+ orders, average delivery time and the hour-of-day buying pattern.',
      'Segmented customers and regions to compare delivery performance and shipping routes.',
      'Built a Power BI dashboard with DAX measures and conditional formatting to highlight under-performing states.',
    ],
    outcomes: [
      'Average delivery time across the dataset: 12 days.',
      'Rio de Janeiro stood out with a late-delivery rate above 12%, roughly double the national average.',
      'Proposed route and carrier changes with a potential 10% reduction in lead times. This is a recommendation from the analysis, not a measured result.',
    ],
    stack: ['SQL', 'MySQL', 'Power BI', 'DAX'],
    repo: 'https://github.com/SurajM80/Supply-Chain-Analysis.sql',
    primaryFile: 'Olist E commerce Project/Olist_data_project.sql',
    image: { base: '/projects/olist-supply-chain', alt: 'Power BI dashboard showing 99.44K total orders, 12 average delivery days, late deliveries by state, yearly growth and an order map', width: 1280, height: 714 },
  },
  {
    id: 'starbucks-warehouse',
    title: 'Nutrition Data Warehouse & Dashboard',
    context: 'Starbucks beverage nutrition dataset',
    year: '2026',
    areas: ['engineering', 'analytics'],
    featured: true,
    summary:
      'A flat CSV reshaped into a star-schema warehouse in MySQL with Python, then reported through an interactive Power BI dashboard.',
    problem:
      'A single flat file of beverage nutrition data is hard to analyse consistently across categories, beverages and preparation types.',
    approach: [
      'Profiled the dataset in Pandas: row and column checks, unique values and structure validation.',
      'Designed a star schema: fact_nutrition (242 rows) with dim_category (9), dim_beverage (33) and dim_prep (13).',
      'Loaded the tables into a dedicated MySQL database with SQLAlchemy and to_sql().',
      'Connected Power BI directly to MySQL for KPI cards (average calories, sugar, caffeine), category comparisons and filters by protein range and preparation.',
    ],
    outcomes: ['An end-to-end flow from CSV to warehouse to dashboard, with the model view and dashboard documented in the repository.'],
    stack: ['Python', 'Pandas', 'SQLAlchemy', 'MySQL', 'Power BI'],
    repo: 'https://github.com/SurajM80/Starbucks_Nutritions_Dashboard',
    primaryFile: 'Jupyter notebook/Main.ipynb',
    image: { base: '/projects/starbucks-warehouse', alt: 'Power BI dashboard with beverage KPIs, average calories by category, a category distribution chart and top caffeine beverages', width: 1280, height: 723 },
  },
  {
    id: 'uidai-drishti',
    title: 'Project Drishti',
    context: 'UIDAI Data Hackathon 2026 · team submission',
    year: '2026',
    areas: ['analytics'],
    summary:
      'Exploratory analysis of Aadhaar enrolment, demographic-update and biometric-update data to understand where and why service demand varies.',
    problem:
      'Aadhaar service demand varies by state, district and age group, so a single allocation of centres and staff does not fit every region.',
    approach: [
      'Combined and cleaned the enrolment, demographic-update and biometric-update datasets with Pandas.',
      'Standardised state names, removed invalid records and validated six-digit pincodes.',
      'Aggregated volumes by state and district and derived the dominant age group for each district.',
      'Visualised the patterns with Matplotlib and Seaborn, including stacked comparisons across states.',
    ],
    outcomes: ['Recommendations for scheduling and resource allocation, documented in the repository README.'],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    repo: 'https://github.com/SurajM80/UIDAI-Data-Hackathon',
    primaryFile: 'Enrolment Dataset (1).ipynb',
    note: 'Hackathon team project (Team UIDAI_4318).',
  },
  {
    id: 'finance-tracker',
    title: 'Personal Finance Tracker',
    context: 'Transaction ledger and wealth forecast',
    year: '2025',
    areas: ['analytics'],
    summary:
      'A SQL transaction ledger with a Python analysis layer that calculates profit and projects how a fund switch could compound over five years.',
    problem: 'Checking whether switching money from a liquid (debt) fund to a flexi-cap (equity) fund was a sound decision, using data rather than intuition.',
    approach: [
      'Modelled a transaction ledger in SQL to record BUY, SELL and SWITCH events.',
      'Used Pandas to calculate realised profit against unrealised holdings.',
      'Used NumPy for a five-year compound projection comparing assumed conservative (6.5%) and aggressive (12.5%) growth rates.',
      'Plotted both trajectories in Matplotlib to show the opportunity cost of staying in the lower-yield fund.',
    ],
    outcomes: ['A wealth-projection chart comparing the two scenarios.'],
    stack: ['SQL', 'Python', 'Pandas', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/SurajM80/personal-Finance-tracker-',
    primaryFile: 'jioblackrock.ipynb',
  },
  {
    id: 'housing-regression',
    title: 'California House Price Prediction',
    context: 'Linear regression on the California Housing dataset',
    year: '2026',
    areas: ['ml'],
    summary:
      'A linear regression model for house prices, including debugging a scaling mistake that broke evaluation and reading what the coefficients reveal.',
    problem: 'Predict median house values and understand which features actually drive price.',
    approach: [
      'Prepared features with Pandas and NumPy and trained a scikit-learn Linear Regression model.',
      'Traced an R² of −1403 to unscaled test data being passed to a model trained on scaled features; fixed it by fitting StandardScaler on training data only and transforming the test set.',
      'Plotted actual vs predicted values and extracted coefficients to rank feature influence.',
    ],
    outcomes: [
      'Median income was by far the strongest driver of price; house age had little effect.',
      'Spotted the dataset’s $500K price cap as a vertical wall in the prediction plot.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Seaborn', 'Matplotlib'],
    repo: 'https://github.com/SurajM80/Linear-Regreesion',
    primaryFile: 'Linear_regreesion.ipynb',
  },
  {
    id: 'rock-vs-mine',
    title: 'Rock vs Mine Classification',
    context: 'Sonar dataset, binary classification',
    year: '2026',
    areas: ['ml'],
    summary: 'A logistic regression classifier that uses 60 sonar frequency readings to tell a rock from a metal mine.',
    problem: 'Classify an underwater object as a rock or a mine from the energy returned across 60 sonar frequency bands.',
    approach: [
      'Loaded the Sonar dataset into Pandas and checked for missing values and summary statistics.',
      'Split the data into training and test sets and trained a scikit-learn Logistic Regression model as an interpretable baseline.',
      'Evaluated accuracy on both training and test data.',
      'Wrapped the model in a small predictive function for new readings.',
    ],
    outcomes: ['A working predictive system for new sonar readings.'],
    stack: ['Python', 'Pandas', 'NumPy', 'scikit-learn'],
    repo: 'https://github.com/SurajM80/Rock-vs-Mine-Prediction',
    primaryFile: 'Rock Vs Mine Prediction.ipynb',
  },
  {
    id: 'netflix-eda',
    title: 'Netflix Content Library EDA',
    context: 'Exploratory data analysis',
    year: '2025',
    areas: ['analytics'],
    summary: 'Exploratory analysis of the Netflix catalogue: content mix, genres, release years, ratings and growth over time.',
    problem: 'Understand how the Netflix catalogue is distributed and how it has grown.',
    approach: [
      'Cleaned the dataset and handled missing values with Pandas.',
      'Visualised genres, release years and movies vs TV shows with Matplotlib and Seaborn.',
      'Analysed how content additions grew over time and how ratings are distributed.',
    ],
    outcomes: ['A notebook of cleaned data and visual findings on catalogue composition and growth.'],
    stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    repo: 'https://github.com/SurajM80/Netflix-Data-Analysis-Project',
    primaryFile: 'Netflix Data Analysis Project.ipynb',
  },
];

/** The "how I work" explorer in the hero. Each stage links to projects that show it. */
export type Stage = {
  id: string;
  label: string;
  title: string;
  description: string;
  tools: string[];
  projectIds: string[];
  experience?: string;
};

export const stages: Stage[] = [
  {
    id: 'collect',
    label: 'Collect',
    title: 'Collect & ingest',
    description: 'Pull data from REST APIs and flat files into Python — handling pagination, missing fields and safe re-runs.',
    tools: ['Python', 'REST APIs', 'Pandas'],
    projectIds: ['streaming-etl', 'starbucks-warehouse'],
  },
  {
    id: 'store',
    label: 'Model',
    title: 'Clean, model & store',
    description: 'Shape raw records into typed tables: star schemas, primary keys and loads that can run every day.',
    tools: ['MySQL', 'SQLAlchemy', 'Star schema'],
    projectIds: ['starbucks-warehouse', 'streaming-etl'],
  },
  {
    id: 'analyze',
    label: 'Analyse',
    title: 'Query & analyse',
    description: 'Answer operational questions with SQL and Pandas — late deliveries by state, demand by district, content trends.',
    tools: ['SQL', 'Pandas', 'Seaborn'],
    projectIds: ['olist-supply-chain', 'uidai-drishti', 'netflix-eda'],
  },
  {
    id: 'report',
    label: 'Report',
    title: 'Report & visualise',
    description: 'Turn results into Power BI dashboards with KPI cards, DAX measures and filters people can explore.',
    tools: ['Power BI', 'DAX', 'Matplotlib'],
    projectIds: ['olist-supply-chain', 'starbucks-warehouse', 'streaming-etl'],
  },
  {
    id: 'predict',
    label: 'Automate',
    title: 'Predict & automate',
    description: 'Fit baseline ML models, and explore LLM-based agents for workflows that are repeated by hand.',
    tools: ['scikit-learn', 'LangChain'],
    projectIds: ['housing-regression', 'rock-vs-mine'],
    experience: 'Agentic AI internship at CCTech',
  },
];

export type Skill = { name: string; note?: string; projectIds?: string[] };
export type SkillGroup = { title: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming & analysis',
    skills: [
      { name: 'Python', projectIds: ['streaming-etl', 'starbucks-warehouse', 'uidai-drishti', 'finance-tracker', 'housing-regression', 'rock-vs-mine', 'netflix-eda'] },
      { name: 'SQL', note: 'CTEs, window functions', projectIds: ['olist-supply-chain', 'streaming-etl', 'finance-tracker'] },
      { name: 'Pandas', projectIds: ['streaming-etl', 'starbucks-warehouse', 'uidai-drishti', 'finance-tracker', 'housing-regression', 'rock-vs-mine', 'netflix-eda'] },
      { name: 'NumPy', projectIds: ['finance-tracker', 'housing-regression', 'rock-vs-mine'] },
      { name: 'SciPy' },
      { name: 'C++' },
    ],
  },
  {
    title: 'Data engineering',
    skills: [
      { name: 'ETL pipeline design', projectIds: ['streaming-etl', 'starbucks-warehouse'] },
      { name: 'MySQL', projectIds: ['streaming-etl', 'starbucks-warehouse', 'olist-supply-chain'] },
      { name: 'REST API integration', projectIds: ['streaming-etl'] },
      { name: 'Star-schema modelling', projectIds: ['starbucks-warehouse'] },
      { name: 'SQLAlchemy', projectIds: ['starbucks-warehouse'] },
      { name: 'Data wrangling', projectIds: ['uidai-drishti', 'olist-supply-chain', 'netflix-eda'] },
    ],
  },
  {
    title: 'Analytics & visualisation',
    skills: [
      { name: 'Power BI', projectIds: ['streaming-etl', 'olist-supply-chain', 'starbucks-warehouse'] },
      { name: 'DAX', projectIds: ['olist-supply-chain'] },
      { name: 'Power Query' },
      { name: 'Matplotlib', projectIds: ['uidai-drishti', 'finance-tracker', 'housing-regression', 'netflix-eda'] },
      { name: 'Seaborn', projectIds: ['uidai-drishti', 'housing-regression', 'netflix-eda'] },
      { name: 'Tableau', note: 'Foundational' },
    ],
  },
  {
    title: 'Machine learning',
    skills: [
      { name: 'Regression', projectIds: ['housing-regression'] },
      { name: 'Classification', projectIds: ['rock-vs-mine'] },
      { name: 'scikit-learn', projectIds: ['housing-regression', 'rock-vs-mine'] },
      { name: 'XGBoost' },
      { name: 'Statistical modelling' },
    ],
  },
  {
    title: 'AI & tools',
    skills: [
      { name: 'LangChain', note: 'CCTech internship' },
      { name: 'RAG', note: 'Learning' },
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'VS Code' },
    ],
  },
];

export const education = [
  {
    school: 'Pimpri Chinchwad University',
    place: 'Pune',
    degree: 'Bachelor of Technology, Computer Science Engineering',
    detail: 'Specialisation: AI & Data Science',
    period: '2023 – 2027',
    score: 'CGPA 8.3 / 10',
  },
  {
    school: 'Fergusson College',
    place: 'Pune',
    degree: 'Higher Secondary Certificate (HSC)',
    period: '2021 – 2023',
  },
];

export const credentials = [
  { title: 'Career Essentials in Data Analysis', issuer: 'Microsoft & LinkedIn', kind: 'Certification' },
  { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', kind: 'Certification' },
  { title: 'IDEATHON 2.0', issuer: 'Organising committee member', kind: 'Hackathon' },
];

export const projectById = (id: string) => projects.find((p) => p.id === id);

export interface StaticBlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  readTime: string;
}

export const blogPosts: StaticBlogPost[] = [
  {
    id: 1,
    title: "The Future of Automation in Small Business",
    excerpt: "How automation is revolutionizing the way small businesses operate and compete in today's market.",
    content:
      "Automation is no longer reserved for large enterprises. Small businesses across Kenya and beyond are now using workflow automation, AI assistants, and integrated dashboards to compete with much larger players.\n\nIn this article we explore the key areas where automation delivers the highest ROI for small business: customer onboarding, invoicing, lead follow-up, inventory tracking, and reporting. We also share a practical framework for choosing your first automation project.\n\nThe businesses that win the next decade will be the ones that free their teams from repetitive work so they can focus on strategy, creativity, and customer relationships.",
    category: "Industry Insights",
    date: "May 15, 2025",
    author: "Sarah Johnson",
    authorRole: "CTO at NafArro Solutions",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "10 Processes You Should Automate Today",
    excerpt:
      "A comprehensive guide to identifying and automating repetitive tasks that are costing your business time and money.",
    content:
      "Most teams are sitting on hours of recoverable time every week. In this guide we walk through ten specific business processes that almost always benefit from automation: invoice generation, appointment reminders, lead qualification, social media scheduling, report distribution, payroll calculations, customer feedback collection, file backups, document approvals, and onboarding checklists.\n\nFor each process we describe the typical pain point, a recommended tooling stack, and rough implementation effort so you can prioritize the quick wins first.",
    category: "Tutorials",
    date: "May 10, 2025",
    author: "Michael Chang",
    authorRole: "Automation Specialist",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Data-Driven Decision Making: A Beginner's Guide",
    excerpt: "Learn how to leverage your business data to make informed decisions and drive growth.",
    content:
      "Data-driven decision making starts with asking the right questions. Before building dashboards or hiring analysts, define the handful of metrics that actually move your business forward.\n\nThis beginner's guide covers: identifying north-star metrics, choosing the right data sources, cleaning and consolidating data, building simple dashboards, and creating a weekly review rhythm. By the end you'll have a lightweight analytics practice you can actually sustain.",
    category: "Data Analysis",
    date: "May 5, 2025",
    author: "Elena Rodriguez",
    authorRole: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "5 Ways Automation Can Reduce Operational Costs",
    excerpt: "Discover how implementing automation in key areas can significantly cut your business expenses.",
    content:
      "Operational costs quietly eat into margins. Automation attacks them from five angles: reducing manual labour hours, eliminating costly human errors, improving asset utilisation, shortening cash collection cycles, and lowering customer support load through self-service.\n\nWe break down each lever with realistic examples from Kenyan SMEs and explain how to measure the savings so you can build a credible business case for your next automation initiative.",
    category: "Industry Insights",
    date: "April 28, 2025",
    author: "Sarah Johnson",
    authorRole: "CTO at NafArro Solutions",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: "4 min read",
  },
  {
    id: 5,
    title: "Building Your First Automated Workflow with Node.js",
    excerpt: "A technical tutorial on creating efficient automated workflows using Node.js and Express.",
    content:
      "In this hands-on tutorial we build a small but production-ready workflow in Node.js. The workflow watches an inbox, parses incoming purchase orders, writes them to a database, and notifies the operations team on Slack.\n\nAlong the way we cover project structure, environment configuration, error handling, retries, and basic observability. You'll finish with a template you can adapt to dozens of internal automation use-cases.",
    category: "Tutorials",
    date: "April 22, 2025",
    author: "Michael Chang",
    authorRole: "Automation Specialist",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: "10 min read",
  },
  {
    id: 6,
    title: "The Role of AI in Modern Business Automation",
    excerpt:
      "Exploring how artificial intelligence is enhancing automation capabilities for businesses of all sizes.",
    content:
      "AI is changing what 'automation' even means. Where traditional automation handled rigid, rule-based tasks, AI now lets us automate fuzzy work: classifying tickets, summarising meetings, drafting replies, extracting data from messy documents.\n\nThis article maps the AI capabilities most relevant to small and mid-sized businesses today and gives you a checklist for evaluating where AI-powered automation will actually pay back.",
    category: "Industry Insights",
    date: "April 18, 2025",
    author: "Sarah Johnson",
    authorRole: "CTO at NafArro Solutions",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: "7 min read",
  },
  {
    id: 7,
    title: "User Experience Best Practices for Business Applications",
    excerpt:
      "Key principles to ensure your automated business applications provide excellent user experience.",
    content:
      "Internal tools deserve the same care as customer-facing products. We cover the UX principles that make business applications a joy to use: clear information hierarchy, fast feedback, forgiving forms, sensible defaults, keyboard friendliness, and thoughtful empty states.\n\nApply these and adoption of your automation tools will accelerate dramatically.",
    category: "Web Development",
    date: "April 15, 2025",
    author: "Elena Rodriguez",
    authorRole: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read",
  },
  {
    id: 8,
    title: "Visualizing Data: Creating Effective Dashboards",
    excerpt: "Learn how to design informative and user-friendly dashboards for your business data.",
    content:
      "A great dashboard answers a question in under five seconds. We share our team's checklist for building dashboards that get used: pick one audience, lead with the headline metric, choose chart types deliberately, annotate anomalies, and make filters obvious.\n\nIncludes worked examples for sales, operations, and customer-success dashboards.",
    category: "Data Analysis",
    date: "April 10, 2025",
    author: "Elena Rodriguez",
    authorRole: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read",
  },
];

export const getBlogPostById = (id: number | string) =>
  blogPosts.find((p) => String(p.id) === String(id));

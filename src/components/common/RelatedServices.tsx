import React from 'react';
import { Link } from 'react-router-dom';
import { Code, BarChart3, Globe } from 'lucide-react';

interface RelatedServicesProps {
  currentPath?: string;
  title?: string;
}

const ALL_SERVICES = [
  {
    path: '/services/web-development',
    title: 'Website Development',
    description: 'Custom, SEO-friendly websites built with React and modern tooling for growing businesses.',
    icon: Globe,
    keywords: 'React websites, Vite, Tailwind CSS',
  },
  {
    path: '/services/automation',
    title: 'Web Applications & Automation',
    description: 'Replace manual workflows with custom web apps powered by Node.js and Supabase.',
    icon: Code,
    keywords: 'workflow automation, Node.js APIs',
  },
  {
    path: '/services/data-analysis',
    title: 'Data Analysis & Reporting',
    description: 'Turn raw business data into dashboards, insights and automated reports.',
    icon: BarChart3,
    keywords: 'data dashboards, automated reports',
  },
];

const RelatedServices: React.FC<RelatedServicesProps> = ({
  currentPath,
  title = 'Explore Related Services',
}) => {
  const related = ALL_SERVICES.filter((s) => s.path !== currentPath);

  return (
    <section className="py-16 bg-muted" aria-labelledby="related-services-heading">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 id="related-services-heading" className="text-3xl font-bold text-primary mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover other ways NafArro Solutions helps businesses automate, scale and gain insight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.path}
                to={service.path}
                className="group block bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all"
                title={`Learn more about ${service.title}`}
              >
                <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                <span className="text-primary font-medium text-sm group-hover:underline">
                  Learn more →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RelatedServices;

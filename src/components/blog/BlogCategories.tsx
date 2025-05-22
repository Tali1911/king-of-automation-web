
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Lightbulb, BarChart3, Laptop } from 'lucide-react';

const BlogCategories = () => {
  const categories = [
    {
      title: "Tutorials",
      icon: <Code className="w-10 h-10 text-primary" />,
      description: "Step-by-step guides on implementing automation solutions",
      count: 12,
      link: "/blog/category/tutorials"
    },
    {
      title: "Industry Insights",
      icon: <Lightbulb className="w-10 h-10 text-primary" />,
      description: "Latest trends and developments in automation technology",
      count: 8,
      link: "/blog/category/insights"
    },
    {
      title: "Data Analysis",
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
      description: "Articles on leveraging data for business decisions",
      count: 6,
      link: "/blog/category/data-analysis"
    },
    {
      title: "Web Development",
      icon: <Laptop className="w-10 h-10 text-primary" />,
      description: "Best practices and tips for modern web development",
      count: 9,
      link: "/blog/category/web-development"
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Browse by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="block">
              <Card className="h-full card-hover transition-all hover:bg-primary hover:text-white group">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-white">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-muted-foreground group-hover:text-white/80">{category.description}</p>
                </CardContent>
                
                <CardFooter className="pt-0 justify-center">
                  <span className="text-sm font-medium group-hover:text-white/90">{category.count} Articles</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCategories;

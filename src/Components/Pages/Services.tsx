import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface ServiceCardProps {
  title: string;
  items: string[];
}

const ServiceCard: FC<ServiceCardProps> = ({ title, items }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            {item}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

interface TechnologyStackSectionProps {
  title: string;
  technologies: string[];
}

const TechnologyStackSection: FC<TechnologyStackSectionProps> = ({ title, technologies }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span key={index} className={cn("bg-secondary px-3 py-1 rounded-full text-sm")}>
            {tech}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ProcessCard: FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Services: FC = () => {
  const coreServices = [
    {
      title: "Full-Stack Web Applications",
      items: [
        "Modern, scalable applications built with industry-leading frameworks",
        "Custom business automation solutions",
        "Real-time data processing systems",
        "Complex workflow management tools",
        "Interactive dashboards and analytics platforms",
        "Secure user authentication and authorization systems",
      ],
    },
    {
      title: "API Development & Integration",
      items: [
        "RESTful API design and implementation",
        "Third-party service integrations",
        "Microservices architecture",
        "Real-time communication systems",
        "Payment gateway integrations",
      ],
    },
    {
      title: "Enterprise WordPress Solutions",
      items: [
        "Custom theme development",
        "Complex plugin development",
        "E-commerce solutions",
        "Content management systems",
        "Performance optimization",
        "Security hardening",
      ],
    },
    {
      title: "Legacy System Modernization",
      items: [
        "Code refactoring and optimization",
        "Database optimization",
        "System migration",
        "Architecture redesign",
        "Performance improvements",
      ],
    },
  ];

  const techStack = {
    frontend: ["React", "Redux", "TypeScript", "Modern CSS/SASS", "Progressive Web Apps (PWA)"],
    backend: ["Laravel", "Node.js", "Symfony", "RESTful APIs", "WebSocket"],
    database: ["MySQL", "PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
    infrastructure: ["AWS", "Docker", "CI/CD", "Git", "Linux Server Administration"],
  };

  const projectTypes = [
    {
      title: "Business Process Automation",
      items: [
        "Workflow automation systems",
        "Document management",
        "Reporting and analytics",
        "Communication systems",
      ],
    },
    {
      title: "Customer Portals",
      items: [
        "Self-service platforms",
        "Client management systems",
        "Secure document sharing",
        "Interactive dashboards",
      ],
    },
    {
      title: "Internal Tools",
      items: [
        "Employee management systems",
        "Resource scheduling",
        "Inventory management",
        "Performance tracking",
      ],
    },
  ];

  const developmentProcess = [
    {
      title: "Discovery & Planning",
      items: [
        "Business requirements analysis",
        "Technical architecture design",
        "Project roadmap creation",
        "Technology stack selection",
      ],
    },
    {
      title: "Development & Implementation",
      items: [
        "Agile development methodology",
        "Regular progress updates",
        "Continuous integration",
        "Quality assurance testing",
      ],
    },
    {
      title: "Deployment & Support",
      items: [
        "Production deployment",
        "Performance monitoring",
        "Ongoing maintenance",
        "Technical support",
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Services</h1>
        <h2 className="text-2xl font-semibold mb-4">
          Custom Software Development That Drives Results
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We transform business challenges into powerful digital solutions using best-in-class
          technologies and frameworks. Our services are tailored to meet your specific needs, whether
          you're starting from scratch or upgrading existing systems.
        </p>
      </div>

      {/* Core Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Core Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreServices.map((service, index) => (
            <ServiceCard key={index} title={service.title} items={service.items} />
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TechnologyStackSection title="Frontend Development" technologies={techStack.frontend} />
          <TechnologyStackSection title="Backend Development" technologies={techStack.backend} />
          <TechnologyStackSection title="Database & Caching" technologies={techStack.database} />
          <TechnologyStackSection title="Infrastructure" technologies={techStack.infrastructure} />
        </div>
      </section>

      {/* Development Process */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Development Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {developmentProcess.map((process, index) => (
            <ProcessCard key={index} title={process.title} items={process.items} />
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Industries We Serve</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Field Service Operations",
            "Financial Services",
            "Business Automation",
            "E-commerce",
            "Healthcare",
            "Real Estate",
            "Professional Services",
          ].map((industry, index) => (
            <Card key={index} className="hover:bg-accent transition-colors">
              <CardContent className="p-4 text-center">{industry}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Project Types */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Project Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectTypes.map((project, index) => (
            <ServiceCard key={index} title={project.title} items={project.items} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <Card className="bg-accent">
        <CardContent className="text-center p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8">
            Every project begins with understanding your unique challenges and goals. Let's discuss how we
            can create a solution that drives your business forward.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Contact Us
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services; 
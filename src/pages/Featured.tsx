import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "Power bi dashboard",
    description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "🛍️"
  },
  {
    id: 2,
    title: "Odoo erp system - Navixy gps",
    description: "Real-time collaborative task management tool with drag-and-drop functionality and team features.",
    technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "📋"
  },
  {
    id: 3,
    title: "Machine learning projects",
    description: "Analytics dashboard for social media metrics with data visualization and reporting capabilities.",
    technologies: ["React", "D3.js", "Express", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "📊"
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "Beautiful weather application with location-based forecasts, maps, and severe weather alerts.",
    technologies: ["React", "OpenWeather API", "Mapbox", "Redux"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "🌤️"
  },
  {
    id: 5,
    title: "Portfolio Generator",
    description: "SaaS tool that helps developers create and customize their portfolio websites with templates.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "AWS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "🎨"
  },
  {
    id: 6,
    title: "AI Content Writer",
    description: "AI-powered content generation tool for blogs, social media, and marketing copy using GPT models.",
    technologies: ["React", "OpenAI API", "Node.js", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "✨"
  }
];

const Featured = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Featured Projects</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            A curated selection of my best work, showcasing various technologies
            and problem-solving approaches.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="bg-card border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="text-6xl mb-4">{project.image}</div>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" />
                        View Code
                      </a>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Featured;

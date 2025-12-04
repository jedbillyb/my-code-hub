import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "Trading Bot",
    description: "Automated stock trading bot using Python and machine learning algorithms to analyze market patterns.",
    tags: ["Python", "ML", "Finance"],
    github: "https://github.com/jedbillyb",
  },
  {
    title: "Portfolio Tracker",
    description: "Real-time portfolio tracking application with performance analytics and visualization.",
    tags: ["React", "TypeScript", "Charts"],
    github: "https://github.com/jedbillyb",
    live: "#",
  },
  {
    title: "Market Analysis Tool",
    description: "Technical analysis tool for stocks with custom indicators and pattern recognition.",
    tags: ["JavaScript", "APIs", "Finance"],
    github: "https://github.com/jedbillyb",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-accent/50 transition-all duration-300 group">
    <CardHeader>
      <div className="flex items-start justify-between">
        <CardTitle className="text-lg font-heading text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </CardTitle>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={`View ${project.title} live`}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
      <CardDescription className="text-muted-foreground">
        {project.description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-secondary/50 text-secondary-foreground">
            {tag}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4 text-center">
          Projects
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A collection of my development work, focusing on finance and automation.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

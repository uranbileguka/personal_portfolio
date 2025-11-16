import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Star } from "lucide-react";
import { toast } from "sonner";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
}

const CurrentProjects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("octocat"); // Default GitHub username

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      toast.error("Failed to load projects from GitHub");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Current Projects</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            These are my latest projects fetched directly from GitHub, showcasing
            my recent work and ongoing development.
          </p>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse bg-card border-border">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <Card 
                  key={repo.id} 
                  className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl flex-1">{repo.name}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star size={16} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-sm">{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {repo.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {repo.language && (
                        <Badge variant="secondary" className="bg-secondary/50">{repo.language}</Badge>
                      )}
                      {repo.topics.slice(0, 2).map((topic) => (
                        <Badge key={topic} variant="outline" className="border-muted">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 border-muted hover:bg-muted"
                      >
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={16} className="mr-2" />
                          Code
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button asChild size="sm" className="flex-1 bg-muted hover:bg-muted/80 text-foreground">
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} className="mr-2" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CurrentProjects;

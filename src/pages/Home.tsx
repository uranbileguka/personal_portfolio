import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Star, ExternalLink, Images, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Download } from "lucide-react";
import { useState, useEffect } from "react";
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

const Home = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [username] = useState("uranbileguka");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [demoUrl, setDemoUrl] = useState("");

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
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

      {/* Gallery Modal */}
      {galleryOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in p-4 sm:p-6">
          <div className="relative w-full max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setGalleryOpen(false);
                setSelectedProject(null);
              }}
              className="sticky top-4 float-right z-10 p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors mb-4"
            >
              <X size={24} />
            </button>

            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 clear-both">
              <h3 className="text-3xl font-bold mb-6">
                {[
                  {
                    id: 1,
                    title: "Power BI Dashboards",
                    gallery: [
                      { id: 1, description: "Dashboard View" },
                      { id: 2, description: "Channel Management" },
                      { id: 3, description: "Real-time Chat Interface" },
                      { id: 4, description: "User Settings" },
                      { id: 5, description: "Workspace Overview" }
                    ]
                  },
                  {
                    id: 2,
                    title: "Odoo18 × Navixy GPS Integration",
                    gallery: [
                      { id: 1, description: "Task Board" },
                      { id: 2, description: "Calendar View" },
                      { id: 3, description: "Team Collaboration" }
                    ]
                  },
                  {
                    id: 3,
                    title: "Social Media Dashboard",
                    gallery: [
                      { id: 1, description: "Analytics Overview" },
                      { id: 2, description: "Engagement Metrics" },
                      { id: 3, description: "Growth Charts" },
                      { id: 4, description: "Platform Comparison" }
                    ]
                  },
                  {
                    id: 4,
                    title: "Django Backend + React.js Fleet Management",
                    gallery: [
                      { id: 1, description: "Fleet Dashboard" },
                      { id: 2, description: "Zone Report" },
                      { id: 3, description: "Fuel Report" },
                      { id: 4, description: "Fleet Record" }
                    ]
                  }
                ].find(p => p.id === selectedProject)?.title} - Gallery
              </h3>

              <div className="space-y-6">
                {[
                  {
                    id: 1,
                    gallery: [
                      { id: 1, title: "Dashboard Overview", description: "Main dashboard with key metrics and KPIs" },
                      { id: 2, title: "Channel Management", description: "Manage communication channels and workflows" },
                      { id: 3, title: "Real-time Chat", description: "Live chat interface for team collaboration" },
                      { id: 4, title: "User Settings", description: "Customize user preferences and permissions" },
                      { id: 5, title: "Workspace Overview", description: "Complete workspace management interface" }
                    ]
                  },
                  {
                    id: 2,
                    gallery: [
                      { id: 1, title: "Odoo 18 dashboard", description: "Main ERP dashboard with integrated GPS data", image: "/odoo-0.png" },
                      { id: 2, title: "Dump Haul Cycles Count", description: "Real-time vehicle tracking and monitoring", image: "/odoo-1.png" },
                      { id: 3, title: "Dump work-stop ratio", description: "GPS route visualization and efficiency metrics", image: "/odoo-2.png" },
                      { id: 4, title: "Dump fuel Consumption", description: "Detailed fuel usage tracking and analysis", image: "/odoo-3.png" },
                      { id: 5, title: "Plan and performance", description: "Geofencing and zone-based monitoring", image: "/odoo-4.png" },
                      { id: 6, title: "Sales orders", description: "Vehicle operation hours and activity tracking", image: "/odoo-5.png" }
                    ]
                  },
                  {
                    id: 3,
                    gallery: [
                      { id: 1, title: "Kannada MNIST - Before Reduction", description: "Original high-dimensional dataset visualization showing complexity", image: "/ML_bef_digit.png" },
                      { id: 2, title: "Kannada MNIST - After Dimensionality Reduction", description: "PCA and t-SNE applied for clear cluster visualization", image: "/ML_after_digits.png" },
                      { id: 3, title: "Regression Analysis", description: "Linear and polynomial regression model comparison", image: "/ML_regression.png" },
                      { id: 4, title: "Wine Quality Clustering", description: "K-Means clustering analysis on wine dataset", image: "/ML_wine_cluster.png" }
                    ]
                  },
                  {
                    id: 4,
                    gallery: [
                      { id: 1, title: "Fleet Login", description: "Real-time vehicle tracking and status overview", image: "/fleet-1.jpeg" },
                      { id: 2, title: "Zone Report", description: "Detailed fuel consumption analysis and trends", image: "/fleet-2.png" },
                      { id: 3, title: "Fuel Report", description: "Geofencing and zone-based activity monitoring", image: "/fleet-3.png" },
                      { id: 4, title: "Fleet Record", description: "Complete trip logs with route visualization", image: "/fleet-4.png" }
                    ]
                  }
                ].find(p => p.id === selectedProject)?.gallery.map((img) => (
                  <div key={img.id} className="w-full">
                    <h4 className="text-xl font-semibold mb-3 text-primary">{img.title}</h4>
                    <div className="aspect-video rounded-lg bg-muted flex items-center justify-center border border-border hover:border-primary/30 transition-colors overflow-hidden">
                      {img.image ? (
                        <img
                          src={img.image}
                          alt={img.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'text-center px-4';
                            fallback.innerHTML = `<div class="text-center px-4"><svg class="mx-auto mb-2 text-muted-foreground" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg><p class="text-sm text-muted-foreground">${img.description}</p><p class="text-xs text-muted-foreground/60 mt-1">Image not found</p></div>`;
                            e.currentTarget.parentElement?.appendChild(fallback);
                          }}
                        />
                      ) : (
                        <div className="text-center px-4">
                          <Images size={48} className="mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">{img.description}</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Add your image here</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Credentials Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in p-4">
          <div className="relative w-full max-w-md">
            <div className="bg-card border-2 border-primary/30 rounded-xl p-8 shadow-2xl">
              <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">🔑</span>
                </div>

                <h3 className="text-2xl font-bold">Demo Login Credentials</h3>

                <div className="space-y-4 bg-muted/50 rounded-lg p-6 border border-border">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Email:</p>
                    <p className="text-lg font-bold text-primary font-mono">
                      {demoUrl.includes('fleet.uranbileg.dev') ? 'test@test.com' : 'test'}
                    </p>
                      </div>
                  <div className="h-px bg-border"></div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Password:</p>
                    <p className="text-lg font-bold text-primary font-mono">
                      {demoUrl.includes('fleet.uranbileg.dev') ? 'testpass123' : 'test'}
                    </p>
                    </div>
                  </div>

                <p className="text-sm text-muted-foreground">
                  {demoUrl.includes('fleet.uranbileg.dev') 
                    ? 'Use these credentials to access the Fleet Management System demo'
                    : 'Use these credentials to access the Odoo ERP × Navixy GPS Integration demo'}
                </p>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setLoginModalOpen(false)}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted"
                  >
                    Cancel
                  </Button>
                    <Button
                      onClick={() => {
                        window.open(demoUrl, '_blank');
                        setLoginModalOpen(false);
                      }}
                    className="flex-1 bg-primary hover:bg-primary/90"
                    >
                    <ExternalLink size={16} className="mr-2" />
                    Go to Demo
                    </Button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in-left">
              <div className="inline-block">
                <span className="px-3 sm:px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded text-xs sm:text-sm font-mono">
                  Software developer & Data Analyst & ERP Specialist
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                Hi, I'm
                <br />
                Uranbileg Enkhjargal
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-lg">
                I turn messy operational and financial data into clear insights, dashboards, and automated systems.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-block text-primary text-base sm:text-lg font-mono border-b-2 border-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                >
                  LET'S CHAT!
                </button>
              </div>

              {/* Profile Photo - Mobile Only (shown after LET'S CHAT!) */}
              <div className="lg:hidden relative animate-fade-in-right pt-4">
                <div className="relative aspect-square max-w-xs mx-auto">
                  {/* Floating Tech Icons for Mobile */}
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 text-primary animate-pulse">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.413-.135.663-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                    </svg>
                  </div>

                  <div className="absolute bottom-1/3 right-1/4 w-12 h-12 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                    </svg>
                  </div>

                  <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '1s' }}></div>

                  {/* Image placeholder */}
                  <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-border h-full">
                    <img
                      src="/profile.jpg"
                      alt="Uranbileg Enkhjargal"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full"><div class="text-center p-8"><p class="text-muted-foreground">Your Photo Here</p><p class="text-sm text-muted-foreground mt-2">Add profile.jpg to public folder</p></div></div>';
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 sm:gap-12 pt-6 sm:pt-8">
                <div>
                  <div className="text-4xl sm:text-5xl font-bold mb-1">6</div>
                  <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
                    YEARS<br />EXPERIENCE
                  </div>
                </div>
                {/* <div>
                  <div className="text-4xl sm:text-5xl font-bold mb-1">20</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    PROJECTS<br />COMPLETED
                  </div>
                </div> */}
              </div>

              <div className="flex gap-6 pt-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://github.com/uranbileguka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/uranbileg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            {/* Right Side - Image Placeholder with Tech Icons (Desktop Only) */}
            <div className="relative animate-fade-in-right hidden lg:block">
              <div className="relative aspect-square max-w-md lg:max-w-lg mx-auto">
                {/* Floating Tech Icons */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 text-primary animate-pulse">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.413-.135.663-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                </div>

                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                  </svg>
                </div>

                <div className="absolute top-1/2 right-12 w-12 h-12 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="absolute top-1/3 right-1/3 w-16 h-16 text-blue-400 animate-pulse" style={{ animationDelay: '1.5s' }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d="M14.834 12.012c1.415.287 2.313.99 2.313 1.777 0 1.003-1.327 1.817-2.963 1.817s-2.963-.814-2.963-1.817c0-.787.898-1.49 2.313-1.777.344-.074.692-.12 1.08-.12.39 0 .737.046 1.22.12zm-1.22 3.094c-1.174 0-2.127-.534-2.127-1.194 0-.66.953-1.194 2.127-1.194 1.174 0 2.127.534 2.127 1.194 0 .66-.953 1.194-2.127 1.194zm-2.11-7.92c.36 0 .653-.292.653-.653 0-.36-.293-.653-.653-.653-.36 0-.653.293-.653.653 0 .36.293.653.653.653zm1.774-1.93c.36 0 .653-.292.653-.653 0-.36-.293-.653-.653-.653-.36 0-.653.293-.653.653 0 .36.293.653.653.653zm3.548 1.93c.36 0 .653-.292.653-.653 0-.36-.293-.653-.653-.653-.36 0-.653.293-.653.653 0 .36.293.653.653.653zm-1.774-1.93c.36 0 .653-.292.653-.653 0-.36-.293-.653-.653-.653-.36 0-.653.293-.653.653 0 .36.293.653.653.653z" />
                  </svg>
                </div>

                {/* Image placeholder */}
                <div className="relative rounded-2xl overflow-hidden bg-card/50 border border-border h-full">
                  <img
                    src="/profile.jpg"
                    alt="Uranbileg Enkhjargal"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center h-full"><div class="text-center p-8"><p class="text-muted-foreground">Your Photo Here</p><p class="text-sm text-muted-foreground mt-2">Add profile.jpg to public folder</p></div></div>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="featured" className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-primary tracking-widest uppercase mb-4">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              A curated selection of my best work, showcasing various technologies and problem-solving approaches
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                id: 2,
                title: "Odoo ERP × Navixy GPS Integration",
                description:
                  "A customized Odoo 18 ERP Community Edition system that pulls Navixy GPS data from the API, processes zone, fuel, and activity reports, and converts them into daily operational data. It calculates key mining metrics such as cycle haul counts, work stop ratios, fuel usage, and equipment utilization, and stores everything in Odoo/PostgreSQL for reporting. You can also view the demo sales data and explore core Odoo 18 Community functionalities from this environment.",
                technologies: [
                  "Python",
                  "Odoo 18",
                  "PostgreSQL",
                  "Navixy API",
                ],
                githubUrl: "https://github.com/uranbileguka/odoo18-erp-custom",
                liveUrl: "https://erp.uranbileg.dev/odoo",
                stars: 189,
                image: "/odoo18.jpg",
                gallery: [
                  { id: 1, title: "Dump Haul Cycles Count", description: "Main ERP dashboard with integrated GPS data", image: "/odoo-0.png" },
                  { id: 2, title: "Fleet Management", description: "Real-time vehicle tracking and monitoring", image: "/odoo-1.png" },
                  { id: 3, title: "Route Analysis", description: "GPS route visualization and efficiency metrics", image: "/odoo-2.png" },
                  { id: 4, title: "Fuel Consumption Report", description: "Detailed fuel usage tracking and analysis", image: "/odoo-3.png" },
                  { id: 5, title: "GPS Zone Tracking", description: "Geofencing and zone-based monitoring", image: "/odoo-4.png" },
                  { id: 6, title: "Motion Hour Report", description: "Vehicle operation hours and activity tracking", image: "/odoo-5.png" }
                ],
                showLoginInfo: true
              },
              {
                id: 4,
                title: "Full-Stack Fleet Management App (Django + React)",
                description:
                  "Developed a full-scale web application with Django REST API backend and React.js frontend for comprehensive fleet management and real-time GPS tracking. The Django backend handles authentication, data processing, and API endpoints for GPS data integration with Navixy API. Frontend features interactive dashboards for vehicle monitoring, fuel consumption analysis, trip history, and zone-based reporting. Complete with JWT authentication, Docker containerization, and nginx reverse proxy for production deployment. The system computes operational metrics, manages user sessions, and provides RESTful endpoints for all fleet operations.",
                technologies: [
                  "Django",
                  "React.js",
                  "REST API",
                  "Material-UI",
                  "Recharts",
                  "Docker",
                  "nginx",
                ],
                githubUrl: "https://github.com/uranbileguka/se_gps",
                liveUrl: "https://fleet.uranbileg.dev/login",
                stars: 42,
                image: "/fleet-1.jpeg",
                gallery: [
                  { id: 1, title: "Fleet login", description: "Real-time vehicle tracking and status overview", image: "/fleet-1.jpeg" },
                  { id: 2, title: "Zone Report", description: "Detailed fuel consumption analysis and trends", image: "/fleet-2.png" },
                  { id: 3, title: "Fuel Report", description: "Geofencing and zone-based activity monitoring", image: "/fleet-3.png" },
                  { id: 4, title: "Fleet record", description: "Complete trip logs with route visualization", image: "/fleet-4.png" },
                ],
                showLoginInfo: true
              },
              {
                id: 3,
                title:
                  "Machine learning",
                description:
                  "A set of machine learning experiments focused on customer segmentation, anomaly detection, and classification. Using real-world datasets, models include K-Means and hierarchical clustering, isolation-based outlier detection (Isolation Forest, LOF), and classifiers such as Logistic Regression and SVM. Dimensionality reduction with PCA and t-SNE is used for visualization and insight communication.",
                technologies: ["Python", "Pandas", "scikit-learn", "NumPy", "Matplotlib", "Seaborn"],
                githubUrl: "https://github.com/uranbileguka/machine_learning",
                liveUrl: "https://github.com/uranbileguka/machine_learning/blob/main/README.md",
                stars: 167,
                image: "/ml.jpg",
                gallery: [
                  { id: 1, title: "Kannada MNIST - Before Reduction", description: "Original high-dimensional dataset visualization showing complexity", image: "/ML_bef_digit.png" },
                  { id: 2, title: "Kannada MNIST - After Dimensionality Reduction", description: "PCA and t-SNE applied for clear cluster visualization", image: "/ML_after_digits.png" },
                  { id: 3, title: "Regression Analysis", description: "Linear and polynomial regression model comparison", image: "/ML_regression.png" },
                  { id: 4, title: "Wine Quality Clustering", description: "K-Means clustering analysis on wine dataset", image: "/ML_wine_cluster.png" }
                ]
              },
              {
                id: 1,
                title: "Power BI Dashboards",
                description:
                  "A collection of interactive Power BI dashboards built for a mining/ERP environment. These reports automate cost center tracking, payroll summaries, production KPIs, and cash flow views that previously took hours or days to prepare manually. Data is cleaned and modeled using Power Query and SQL, with DAX measures for dynamic time intelligence and variance analysis.",
                technologies: ["Power BI", "Power Query", "SQL", "DAX"],
                githubUrl: "https://github.com",
                liveUrl: "https://example.com",
                stars: 245,
                image: "🛍️",
                gallery: [
                  { id: 1, title: "Dashboard Overview", description: "Main dashboard with key metrics and KPIs" },
                  { id: 2, title: "Channel Management", description: "Manage communication channels and workflows" },
                  { id: 3, title: "Real-time Chat", description: "Live chat interface for team collaboration" },
                  { id: 4, title: "User Settings", description: "Customize user preferences and permissions" },
                  { id: 5, title: "Workspace Overview", description: "Complete workspace management interface" }
                ]
              },
            ].map((project, index) => (
              <div
                key={project.id}
                className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Left side - Project Preview */}
                <div className="relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all">
                  {project.image.startsWith('/') ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain aspect-video bg-muted/30"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="flex items-center justify-center p-6 sm:p-8"><div class="text-center"><p class="text-6xl sm:text-7xl lg:text-8xl mb-4">📋</p><p class="text-xs sm:text-sm text-muted-foreground">Project Preview</p></div></div>';
                      }}
                    />
                  ) : (
                    <div className="text-center p-6 sm:p-8">
                      <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">{project.image}</div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Project Preview</p>
                    </div>
                  )}
                </div>

                {/* Right side - Project Details */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs sm:text-sm text-primary tracking-widest uppercase">
                        Featured Project
                      </p>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Star size={16} className="fill-yellow-500 text-yellow-500 sm:w-[18px] sm:h-[18px]" />
                        <span className="text-base sm:text-lg font-semibold">{project.stars}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{project.title}</h3>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs sm:text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                    <Button
                      asChild
                      variant="outline"
                      className="border-muted hover:bg-muted"
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
                    <Button
                      onClick={() => {
                        setSelectedProject(project.id);
                        setGalleryOpen(true);
                      }}
                      variant="outline"
                      className="border-muted hover:bg-muted"
                    >
                      <Images size={16} className="mr-2" />
                      Gallery
                    </Button>
                    {project.showLoginInfo ? (
                      <Button
                        onClick={() => {
                          setDemoUrl(project.liveUrl);
                          setLoginModalOpen(true);
                        }}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </Button>
                    ) : (
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section id="current-projects" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-primary tracking-widest uppercase mb-4">
              Latest Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Current Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              My latest projects fetched directly from GitHub, showcasing recent work and ongoing development
            </p>
          </div>

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
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showAllRepos ? repos : repos.slice(0, 6)).map((repo, index) => (
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

              {repos.length > 6 && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => setShowAllRepos(!showAllRepos)}
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:bg-primary/10"
                  >
                    {showAllRepos ? 'Show Less' : `Show More (${repos.length - 6} more repositories)`}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-primary tracking-widest uppercase mb-4">
              Expertise
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-muted-foreground">
              Technical skills and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tools */}
            <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 animate-fade-in group">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 group-hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["Power BI", "Excel", "Pivot Tables", "VLOOKUP", "Power Query", "Python", "SQL", "GitHub"].map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm py-1.5 px-3 hover:bg-primary/20 hover:scale-105 transition-all animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Programming */}
            <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 animate-fade-in group" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 group-hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">💻</span>
                  </div>
                  Programming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Scikit-Learn"].map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm py-1.5 px-3 hover:bg-primary/20 hover:scale-105 transition-all animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cloud & DevOps */}
            <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 animate-fade-in group" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 group-hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">☁️</span>
                  </div>
                  Cloud & DevOps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {["AWS EC2", "Docker", "Traefik", "PostgreSQL"].map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm py-1.5 px-3 hover:bg-primary/20 hover:scale-105 transition-all animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ERP */}
            <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 animate-fade-in group" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 group-hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">📊</span>
                  </div>
                  ERP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Odoo Modules:</p>
                  <div className="flex flex-wrap gap-3">
                    {["Accounting", "HR", "Payroll", "Inventory", "Manufacturing"].map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-sm py-1.5 px-3 hover:bg-primary/20 hover:scale-105 transition-all animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-sm text-primary tracking-widest uppercase mb-4">
              Get To Know Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              About Me
            </h2>
          </div>

          <Card className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 animate-scale-in">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl leading-relaxed text-foreground">
                  I'm a <span className="text-primary font-semibold">Data Analyst</span> and <span className="text-primary font-semibold">ERP Specialist</span> with <span className="text-primary font-semibold">6 years of experience</span> designing dashboards, automating business processes, and analyzing operational data.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  I've implemented full ERP systems, built machine learning models, and automated complex business workflows to drive efficiency and data-driven decision making.
                </p>

                <div className="pt-6">
                  <p className="text-xl md:text-2xl font-bold text-primary">
                    I love turning data into decisions.
                  </p>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Badge variant="outline" className="text-base py-2 px-4 border-primary/30">
                      Bachelor of Engineering in Software Engineering
                    </Badge>
                    <Badge variant="outline" className="text-base py-2 px-4 border-primary/30">
                      Bachelor of Business Administration in Accounting
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center">
                    <Badge variant="outline" className="text-base py-2 px-4 border-primary/30">
                      Data Analysis
                    </Badge>
                    <Badge variant="outline" className="text-base py-2 px-4 border-primary/30">
                      ERP Systems
                    </Badge>
                    <Badge variant="outline" className="text-base py-2 px-4 border-primary/30">
                      Machine Learning
                    </Badge>
                    <Badge variant="outline" className="text-base py-2 px-4 border-primary/30">
                      Business Intelligence
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm text-primary tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Send me a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Message sent! I'll get back to you soon.");
                  }} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="uenkhjargal@clark.edu"
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        rows={6}
                        required
                        className="bg-background border-border resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Contact Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a
                        href="mailto:uenkhjargal@clark.edu"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        uenkhjargal@clark.edu
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        +1 (774) 351-8585
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Worcester, USA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Download Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/resume.pdf" download>
                      <Download size={16} className="mr-2" />
                      Download CV
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={24} />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter size={24} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

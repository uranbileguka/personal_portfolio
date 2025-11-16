import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, FileText, Mail, Linkedin, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false); // Close mobile menu on navigation
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="text-xl font-bold text-foreground">
            Portfolio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("featured")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Featured
            </button>
            <button
              onClick={() => scrollToSection("current-projects")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Current Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Desktop Social Links */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/uranbileguka"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="/resume.pdf"
              download="Resume.pdf"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={18} />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("featured")}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Featured
                </button>
                <button
                  onClick={() => scrollToSection("current-projects")}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Current Projects
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  Contact
                </button>

                <div className="border-t border-border pt-6 mt-6">
                  <div className="flex flex-col gap-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/uranbileguka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={20} />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="/resume.pdf"
                      download="Resume.pdf"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FileText size={20} />
                      <span>Resume</span>
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

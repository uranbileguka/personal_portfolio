import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Download, Github, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import { useState } from 'react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace these with your EmailJS credentials
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',     // Replace with your EmailJS template ID
        e.currentTarget,
        'YOUR_PUBLIC_KEY'       // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        toast.success("Message sent! I'll get back to you soon.");
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Email send error:', error);
      toast.error("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>

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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="from_name"
                          placeholder="Your name"
                          required
                          className="bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="from_email"
                          type="email"
                          placeholder="your.email@example.com"
                          required
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message..."
                        rows={6}
                        required
                        className="bg-background border-border resize-none"
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
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
                        href="mailto:your.email@example.com"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        your.email@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                  <CardDescription>
                    Download my resume to learn more about my experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <a href="/resume.pdf" download>
                      <Download size={16} className="mr-2" />
                      Download Resume
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={20} />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter size={20} />
                    <span className="text-sm">Twitter</span>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

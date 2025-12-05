import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { posts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import heroBg from "@/assets/hero-bg.jpg";

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-semibold text-foreground">Post not found</h2>
          <p className="mt-4 text-muted-foreground">The article you are looking for does not exist.</p>
          <Link 
            to="/#blog" 
            className="mt-6 inline-flex items-center gap-2 text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-6 pb-8 w-full">
            <Link 
              to="/#blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary/60">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            {post.content?.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-heading font-semibold text-foreground mt-8 mb-4">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              if (line.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-heading font-semibold text-foreground mt-6 mb-3">
                    {line.replace("### ", "")}
                  </h3>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="text-muted-foreground ml-4">
                    {line.replace("- ", "")}
                  </li>
                );
              }
              if (line.startsWith("*") && line.endsWith("*")) {
                return (
                  <p key={i} className="text-muted-foreground/70 italic my-4">
                    {line.replace(/\*/g, "")}
                  </p>
                );
              }
              if (line.trim() === "") return null;
              return (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                  {line}
                </p>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              <span className="font-medium">Disclaimer:</span> This blog post represents my personal opinions and experiences. 
              It is not financial advice. Always do your own research before making any investment decisions.
            </p>
          </div>
        </div>
      </article>

      {/* Footer spacing */}
      <div className="h-16" />
    </div>
  );
};

export default BlogPost;

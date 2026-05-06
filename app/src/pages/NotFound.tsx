import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p
        className="text-[80px] font-medium leading-none mb-4"
        style={{ color: "var(--border)" }}
      >
        404
      </p>
      <h1 className="text-[28px] font-medium mb-4">Page Not Found</h1>
      <p className="mb-8 text-[15px]" style={{ color: "var(--muted-foreground)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center h-12 px-8 text-[13px] font-medium tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
        style={{
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "3px",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

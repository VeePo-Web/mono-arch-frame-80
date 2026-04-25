import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-12">
    <div className="text-center max-w-xl">
      <p className="text-minimal text-evergreen mb-4">404</p>
      <h1 className="text-headline mb-3">Page not found</h1>
      <p className="text-body text-charcoal/70 mb-6">The page you’re looking for has moved or doesn’t exist.</p>
      <Link to="/" className="text-evergreen underline underline-offset-4">Return home</Link>
    </div>
  </main>
);

export default NotFound;

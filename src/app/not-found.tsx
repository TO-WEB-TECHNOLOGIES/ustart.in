import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from '@/router';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header variant="light" />
      <main className="flex-1 flex items-center justify-center py-24 px-6 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-6xl mb-4 block">🍽️</span>
          <h1 className="text-4xl font-extrabold text-[var(--navy)] mb-3">404 - Page Not Found</h1>
          <p className="text-[var(--slate)] mb-6">
            The plate you are looking for seems to have left the table or does not exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--orange)] text-white font-bold hover:opacity-90 transition-opacity"
          >
            Go back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

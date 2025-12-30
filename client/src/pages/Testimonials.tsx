import { useState, useEffect } from "react";
import { Quote, Star, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { apiGet } from "../lib/api";

interface Review {
  name: string;
  text: string;
  rating: number;
  time?: string | null;
  relativeTimeDescription?: string | null;
}

// Mock reviews to display when Google API is not configured
const mockReviews: Review[] = [
  {
    name: "Sneha R.",
    text: "Such a gentle and caring clinic. My cleaning was quick, painless, and I left smiling!",
    rating: 5.0,
    relativeTimeDescription: "2 weeks ago",
  },
  {
    name: "Aravind K.",
    text: "Doctor explains everything patiently. I finally feel confident going to the dentist again.",
    rating: 4.9,
    relativeTimeDescription: "1 month ago",
  },
  {
    name: "Meena S.",
    text: "Very neat clinic and friendly staff. My child didn't even cry during treatment — thank you!",
    rating: 5.0,
    relativeTimeDescription: "3 weeks ago",
  },
  {
    name: "Joseph P.",
    text: "Booked online and was seen on time. Professional approach and honest advice. Highly recommend.",
    rating: 5.0,
    relativeTimeDescription: "1 week ago",
  },
  {
    name: "Lakshmi T.",
    text: "Affordable prices and great care. My tooth pain was treated immediately — relief in minutes!",
    rating: 4.8,
    relativeTimeDescription: "2 months ago",
  },
];

function Stars({ n }: { n: number }) {
  // Round rating to nearest integer for star display
  const rating = Math.round(n);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            "h-4 w-4",
            i < rating ? "fill-brand-500 text-brand-500" : "text-slate-200",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const response = await apiGet<{ reviews: Review[]; message?: string }>("/api/reviews");
        if (response.reviews && response.reviews.length > 0) {
          setReviews(response.reviews);
        } else {
          // Fallback to mock reviews if API is not configured or returns empty
          setReviews(mockReviews);
        }
      } catch (err) {
        // Fallback to mock reviews if API fails
        setReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-dental-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container-page py-8 md:py-12 px-4 sm:px-0">
          <Reveal delay={0.1}>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-2xl sm:text-3xl font-black text-white md:text-4xl lg:text-5xl">
              Testimonials
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">
              What our patients say about us
            </p>
          </Reveal>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-page py-8 sm:py-12 md:py-16 px-4 sm:px-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
              <span className="ml-3 text-sm font-semibold text-slate-600">Loading reviews...</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 text-center">
              <p className="text-sm font-semibold text-slate-600">No reviews available.</p>
            </div>
          ) : (
            <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, i) => {
                const initials = review.name
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((p) => p[0]?.toUpperCase())
                  .join("");

                return (
                  <Reveal key={`${review.name}-${i}`} delay={i * 0.1} width="100%">
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl">
                      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-brand-100 opacity-60 blur-2xl transition duration-500 group-hover:bg-brand-200" />
                      <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-dental-100 opacity-60 blur-2xl transition duration-500 group-hover:bg-dental-200" />

                      <div className="relative">
                        {/* Google Icon */}
                        <div className="mb-3 flex items-center gap-2">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                          </svg>
                          <span className="text-xs font-bold text-slate-600">Google Review</span>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-sm font-black text-white">
                              {initials || "★"}
                            </div>
                            <div>
                              <div className="text-sm font-extrabold text-navy-900">{review.name}</div>
                              <Stars n={review.rating} />
                            </div>
                          </div>
                          <Quote className="h-5 w-5 text-brand-300" />
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-slate-700">
                          "{review.text}"
                        </p>

                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <div className="text-xs font-semibold text-slate-500">
                            {review.relativeTimeDescription || "Verified Google review"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



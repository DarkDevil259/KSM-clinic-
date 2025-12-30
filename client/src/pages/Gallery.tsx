import { useState } from "react";
import { X, ZoomIn, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const photos: { id: number; src: string; alt: string; caption: string }[] = [];

export function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null);

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
              Gallery
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">
              Take a look inside our clinic
            </p>
          </Reveal>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-page py-8 sm:py-12 md:py-16 px-4 sm:px-0">
          <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {photos.map((photo, i) => (
              <Reveal key={photo.id} delay={i * 0.05} width="100%">
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 shadow-soft transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-900/0 transition duration-300 group-hover:bg-navy-900/40">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 transition duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">{photo.caption}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.src.replace("w=600", "w=1200")}
              alt={selectedPhoto.alt}
              className="max-h-[75vh] w-full object-contain"
            />
            <div className="bg-white p-4">
              <p className="text-center text-sm font-semibold text-navy-900">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


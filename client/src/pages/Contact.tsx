import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { TextAreaField } from "../components/TextAreaField";
import { apiPost } from "../lib/api";
import { CLINIC } from "../constants/clinic";
import { Mail, MapPin, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().min(7, "Please enter a valid phone number.").optional().or(z.literal("")),
  message: z.string().min(5, "Please enter a message.").max(1500, "Message is too long."),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setError(null);
    try {
      await apiPost<{}>("/api/contact", values);
      setSent(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-brand-500">
        <div className="container-page py-8 md:py-12">
          <Reveal delay={0.1}>
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
              Contact Us
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-2 max-w-xl text-base text-white/90">
              Ask a question or request a callback.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-page pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal delay={0.2} width="100%">
              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-brand-600" />
                    <div>
                      <div className="text-sm font-extrabold text-navy-900">Phone</div>
                      <a className="mt-1 block text-sm text-slate-600 hover:text-brand-600" href={`tel:${CLINIC.phoneTel}`}>
                        {CLINIC.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-brand-600" />
                    <div>
                      <div className="text-sm font-extrabold text-navy-900">Email</div>
                      <a
                        className="mt-1 block text-sm text-slate-600 hover:text-brand-600"
                        href={`mailto:${CLINIC.ownerEmail}`}
                      >
                        {CLINIC.ownerEmail}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-brand-600" />
                    <div>
                      <div className="text-sm font-extrabold text-navy-900">Address</div>
                      <div className="mt-1 text-sm text-slate-600">
                        {CLINIC.addressLines.map((l) => (
                          <div key={l}>{l}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
                  <div className="text-sm font-extrabold text-navy-900">Want to book?</div>
                  <div className="mt-1 text-sm text-slate-700">
                    Use our appointment form for instant owner notification.
                  </div>
                  <div className="mt-3">
                    <Button to="/appointment" variant="secondary">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3} width="100%">
            <div className="rounded-[2rem] border border-slate-100 bg-white px-6 pt-6 pb-4 shadow-soft">
              <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Full Name"
                    placeholder="Your name"
                    error={errors.fullName?.message}
                    autoComplete="name"
                    {...register("fullName")}
                  />
                  <TextField
                    label="Email"
                    placeholder="you@email.com"
                    error={errors.email?.message}
                    autoComplete="email"
                    {...register("email")}
                  />
                </div>

                <TextField
                  label="Phone (optional)"
                  placeholder="e.g. 9876543210"
                  error={errors.phone?.message}
                  inputMode="tel"
                  autoComplete="tel"
                  {...register("phone")}
                />

                <TextAreaField
                  label="Message"
                  placeholder="How can we help?"
                  error={errors.message?.message}
                  rows={6}
                  {...register("message")}
                />

                {error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                ) : null}

                {sent ? (
                  <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
                    <div className="text-sm font-extrabold text-navy-900">Message sent!</div>
                    <div className="mt-1 text-sm text-slate-700">
                      We'll get back to you soon. For faster booking, use the appointment form.
                    </div>
                    <div className="mt-3">
                      <Button to="/appointment" variant="secondary">
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                ) : null}

                <Button type="submit" className="w-full -mt-1">
                  {submitting ? "Sending..." : "Send Message"}
                </Button>

                <div className="text-center text-xs text-slate-500 -mb-2 -mt-1">
                  We respond during working hours. For urgent pain, please call directly.
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}



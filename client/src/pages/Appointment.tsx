import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { TextAreaField } from "../components/TextAreaField";
import { apiPost } from "../lib/api";
import { Calendar, MessageCircle, ShieldCheck } from "lucide-react";
import { Reveal } from "../components/Reveal";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  service: z.string().min(2, "Please select a service."),
  preferredDate: z.string().min(4, "Please choose a date."),
  preferredTime: z.string().min(1, "Please choose a time."),
  message: z.string().max(800, "Message is too long.").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const services = [
  "Teeth Cleaning",
  "Tooth Filling",
  "Root Canal",
  "Braces / Aligners",
  "Teeth Whitening",
  "Dental Implants",
  "General Checkup",
];

export function Appointment() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | { whatsappUrl?: string }>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: "General Checkup",
    },
  });

  const selectedService = watch("service");

  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 0);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await apiPost<{ whatsappUrl?: string }>(
        "/api/appointment",
        values
      );
      setSuccess({ whatsappUrl: res.whatsappUrl });
      reset({ service: values.service });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-page py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border border-dental-100 bg-white px-3 py-1 text-xs font-bold text-dental-700 shadow-soft">
              <ShieldCheck className="h-4 w-4" />
              Fast booking • Owner notified instantly
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-navy-900 md:text-4xl">
              Book an Appointment
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-3 max-w-xl text-base text-slate-600">
              Fill the form and submit. We’ll email the clinic owner right away and (optionally) give you a WhatsApp link
              to send the same details instantly.
            </p>
          </Reveal>

          <Reveal delay={0.4} width="100%">
            <div className="mt-8 rounded-[2rem] border border-slate-100 bg-gradient-to-br from-white via-white to-navy-50 p-6 shadow-soft">
              <div className="text-sm font-bold text-slate-600">Selected service</div>
              <div className="mt-2 text-xl font-extrabold text-navy-900">{selectedService}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} width="100%">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-soft">
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
                  label="Phone"
                  placeholder="e.g. 9876543210"
                  error={errors.phone?.message}
                  autoComplete="tel"
                  inputMode="tel"
                  {...register("phone")}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Email (optional)"
                  placeholder="you@email.com"
                  error={errors.email?.message}
                  autoComplete="email"
                  {...register("email")}
                />
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-700">Service</span>
                  <select
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-dental-300 focus:ring-4 focus:ring-dental-100"
                    {...register("service")}
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service?.message ? (
                    <span className="text-xs font-semibold text-red-600">
                      {errors.service.message}
                    </span>
                  ) : null}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Preferred Date"
                  type="date"
                  error={errors.preferredDate?.message}
                  min={minDate}
                  {...register("preferredDate")}
                />
                <TextField
                  label="Preferred Time"
                  type="time"
                  error={errors.preferredTime?.message}
                  {...register("preferredTime")}
                />
              </div>

              <TextAreaField
                label="Message (optional)"
                placeholder="Anything we should know? (pain, sensitivity, etc.)"
                error={errors.message?.message}
                {...register("message")}
              />

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              {success ? (
                <div className="rounded-2xl border border-dental-200 bg-dental-50 p-4">
                  <div className="text-sm font-extrabold text-navy-900">
                    Submitted! We’ll confirm your slot shortly.
                  </div>
                  <div className="mt-1 text-sm text-slate-700">
                    Want instant follow-up? Tap WhatsApp to send the same details.
                  </div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    {success.whatsappUrl ? (
                      <Button
                        href={success.whatsappUrl}
                        target="_blank"
                        variant="secondary"
                        className="w-full sm:w-auto"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Send via WhatsApp
                      </Button>
                    ) : null}
                    <Button to="/" variant="ghost" className="w-full sm:w-auto">
                      Back to Home
                    </Button>
                  </div>
                </div>
              ) : null}

              <Button type="submit" className="mt-1 w-full" variant="primary">
                <Calendar className="h-4 w-4" />
                {submitting ? "Submitting..." : "Book Appointment"}
              </Button>

              <div className="text-center text-xs text-slate-500">
                By submitting, you agree to be contacted regarding your appointment.
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </div>
  );
}



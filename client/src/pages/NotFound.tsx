import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export function NotFound() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-100 bg-white p-8 text-center shadow-soft">
        <div className="text-sm font-bold text-dental-700">404</div>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-navy-900">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          The page you’re looking for doesn’t exist. Try one of the links below.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button to="/">Go Home</Button>
          <Button to="/appointment" variant="secondary">
            Book Appointment
          </Button>
        </div>
        <div className="mt-6 text-xs text-slate-500">
          Or go to{" "}
          <Link to="/contact" className="font-bold text-navy-900 underline">
            Contact
          </Link>
          .
        </div>
      </div>
    </div>
  );
}






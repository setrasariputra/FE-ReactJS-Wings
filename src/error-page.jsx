import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <section className="flex items-center justify-center min-h-screen text-slate-600">
      <div className="text-center">
        <h1 className="text-3xl my-2">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </section>
  );
}

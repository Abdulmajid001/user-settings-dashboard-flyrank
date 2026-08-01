import { UserSettingsForm } from "@/components/UserSettingsForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100 via-slate-50 to-white p-4 font-sans dark:from-violet-950/20 dark:via-slate-950 dark:to-slate-950 sm:p-8">
      <main className="w-full max-w-2xl">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            Account Settings
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Manage your account preferences and personal information.
          </p>
        </div>
        
        <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80 dark:shadow-none sm:p-10">
          <UserSettingsForm />
        </div>
      </main>
    </div>
  );
}

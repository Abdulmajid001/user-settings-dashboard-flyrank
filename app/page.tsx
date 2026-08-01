import { UserSettingsForm } from "@/components/UserSettingsForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans dark:bg-slate-950 sm:p-8">
      <main className="w-full max-w-2xl">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Account Settings
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Manage your account preferences and personal information.
          </p>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <UserSettingsForm />
        </div>
      </main>
    </div>
  );
}

"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { userSettingsSchema, type UserSettingsValues } from "@/lib/validations"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select } from "@/components/ui/Select"
import { Switch } from "@/components/ui/Switch"
import { Textarea } from "@/components/ui/Textarea"

export function UserSettingsForm() {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string | null>(null)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserSettingsValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      aiModel: "GPT-5.5",
      theme: "System",
      notifications: false,
      bio: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: UserSettingsValues) => {
    setIsSuccess(false)
    setGlobalError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Simulate a random server error occasionally for robustness? No, just success.
      setIsSuccess(true)
    } catch (error) {
      setGlobalError("Failed to save settings. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {isSuccess && (
        <div className="flex items-center gap-2 rounded-md bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
          <p className="text-sm font-medium">Settings saved successfully!</p>
        </div>
      )}

      {globalError && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-500/10 dark:text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{globalError}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <Input
                id="fullName"
                placeholder="John Doe"
                autoComplete="name"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...field}
              />
            )}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-sm text-red-500 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...field}
              />
            )}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-red-500 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Preferred AI Model */}
        <div className="space-y-2">
          <Label htmlFor="aiModel">Preferred AI Model</Label>
          <Controller
            control={control}
            name="aiModel"
            render={({ field }) => (
              <Select
                id="aiModel"
                aria-invalid={!!errors.aiModel}
                aria-describedby={errors.aiModel ? "aiModel-error" : undefined}
                {...field}
              >
                <option value="GPT-5.5">GPT-5.5</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
              </Select>
            )}
          />
          {errors.aiModel && (
            <p id="aiModel-error" className="text-sm text-red-500 font-medium">
              {errors.aiModel.message}
            </p>
          )}
        </div>

        {/* Theme */}
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Controller
            control={control}
            name="theme"
            render={({ field }) => (
              <Select
                id="theme"
                aria-invalid={!!errors.theme}
                aria-describedby={errors.theme ? "theme-error" : undefined}
                {...field}
              >
                <option value="System">System</option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </Select>
            )}
          />
          {errors.theme && (
            <p id="theme-error" className="text-sm text-red-500 font-medium">
              {errors.theme.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="bio">Bio</Label>
            <span className="text-xs text-slate-500">Max 200 characters</span>
          </div>
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <Textarea
                id="bio"
                placeholder="Tell us a little bit about yourself"
                aria-invalid={!!errors.bio}
                aria-describedby={errors.bio ? "bio-error" : undefined}
                {...field}
              />
            )}
          />
          {errors.bio && (
            <p id="bio-error" className="text-sm text-red-500 font-medium">
              {errors.bio.message}
            </p>
          )}
        </div>
        
        {/* Email Notifications Toggle */}
        <div className="flex flex-row items-center justify-between rounded-lg border border-slate-200 p-4 shadow-sm bg-slate-50/50">
          <div className="space-y-0.5">
            <Label htmlFor="notifications" className="text-base">Email Notifications</Label>
            <p className="text-sm text-slate-500">
              Receive alerts about your account activity.
            </p>
          </div>
          <Controller
            control={control}
            name="notifications"
            render={({ field }) => (
              <Switch
                id="notifications"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={field.disabled}
                aria-label="Toggle email notifications"
              />
            )}
          />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto" isLoading={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}

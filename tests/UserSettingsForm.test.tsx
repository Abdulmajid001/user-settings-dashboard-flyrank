import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { UserSettingsForm } from "../components/UserSettingsForm"

describe("UserSettingsForm", () => {
  it("renders correctly with all required fields", () => {
    render(<UserSettingsForm />)
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Preferred AI Model/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Theme/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: /Toggle email notifications/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Save Changes/i })).toBeInTheDocument()
  })

  it("shows validation errors for empty required fields on submit", async () => {
    const user = userEvent.setup()
    render(<UserSettingsForm />)
    
    const submitBtn = screen.getByRole("button", { name: /Save Changes/i })
    await user.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/Full Name must be at least 3 characters long/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument()
  })

  it("shows error for invalid email", async () => {
    const user = userEvent.setup()
    render(<UserSettingsForm />)
    
    const emailInput = screen.getByLabelText(/Email Address/i)
    await user.type(emailInput, "invalid-email")
    
    const submitBtn = screen.getByRole("button", { name: /Save Changes/i })
    await user.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it("disables submit button while submitting and shows loading text", async () => {
    const user = userEvent.setup()
    render(<UserSettingsForm />)
    
    await user.type(screen.getByLabelText(/Full Name/i), "John Doe")
    await user.type(screen.getByLabelText(/Email Address/i), "john@example.com")
    
    const submitBtn = screen.getByRole("button", { name: /Save Changes/i })
    await user.click(submitBtn)
    
    expect(submitBtn).toBeDisabled()
    expect(screen.getByText(/Saving.../i)).toBeInTheDocument()
  })

  it("shows success message after successful submission", async () => {
    const user = userEvent.setup()
    render(<UserSettingsForm />)
    
    await user.type(screen.getByLabelText(/Full Name/i), "John Doe")
    await user.type(screen.getByLabelText(/Email Address/i), "john@example.com")
    
    const submitBtn = screen.getByRole("button", { name: /Save Changes/i })
    await user.click(submitBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/Settings saved successfully!/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })
})

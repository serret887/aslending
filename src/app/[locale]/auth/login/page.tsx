import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/50">
     <div className="w-full max-w-sm md:max-w-3xl">
         <LoginForm />
      </div>
    </div>
  )
}

import AuthForm from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:20px_20px] bg-white">
      <AuthForm />
    </main>
  );
}

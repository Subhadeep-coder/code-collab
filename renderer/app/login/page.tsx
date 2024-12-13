"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../providers/auth-provider";
import { Lock, User } from "lucide-react";
import FormInput from "components/FormInput";
import { testEmail } from "utils/validation";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({ email: "", password: "" });
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);
      router.push("/");
    } catch (error) {
      // Handle login error
      setError("Invalid email or password");
      console.error("Login failed", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      testEmail(value)
        ? setFieldError((prev) => ({ ...prev, email: "" }))
        : setFieldError((prev) => ({
            ...prev,
            email: "Invalid email address",
          }));
    }

    if (name === "password") {
      value.trim() === ""
        ? setFieldError((prev) => ({
            ...prev,
            password: "Password cannot be empty",
          }))
        : setFieldError((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] text-[#D4D4D4]">
      <form
        onSubmit={handleLogin}
        className="bg-[#252526] p-8 rounded-lg shadow-2xl w-96 border border-[#333333]">
        <h2 className="text-2xl mb-6 text-[#9CDCFE] font-bold">Login</h2>
        {error && <p className="text-[#F14C4C] text-sm mt-1">{error}</p>}
        <div className="space-y-4">
          <FormInput
            icon={<User className="absolute left-3 top-3 text-[#608B4E]" />}
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError.email}
          />
          <FormInput
            icon={<Lock className="absolute left-3 top-3 text-[#608B4E]" />}
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={fieldError.password}
            required={true}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0E639C] text-white py-2 rounded-lg hover:bg-[#1177BB] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#0E639C]">
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

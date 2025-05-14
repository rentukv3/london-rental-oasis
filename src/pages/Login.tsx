import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/95 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Log in to RentInLondon</h2>
        <p className="mb-6 text-center text-gray-600">Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            aria-busy={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 flex flex-col items-center gap-2">
          <span>
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </span>
          <Button
            asChild
            variant="link"
            className="text-sm text-blue-600 hover:underline p-0 h-auto"
            disabled
            tabIndex={-1}
          >
            <span>Forgot your password?</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login; 
import { useState } from "react";
import { User, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

interface AccountSettingsProps {
  onBack?: () => void;
  onNavigateToAccount?: () => void;
}

type ViewMode = 'account' | 'signin' | 'signup';

// Zod validation schemas
const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

export function AccountSettings({ onBack, onNavigateToAccount }: AccountSettingsProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('account');
  const { isAuthenticated, username, isLoading, signIn, signUp, signOut } = useAuth();

  // React Hook Form for Sign In
  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // React Hook Form for Sign Up
  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSignIn = async (data: SignInFormData) => {
    const success = await signIn(data);
    if (success) {
      toast.success('Welcome back to your pro account!');
      setViewMode('account');
    } else {
      toast.error('Invalid credentials. Use username: test, password: test');
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    const success = await signUp(data);
    if (success) {
      toast.success('Your pro account has been created successfully!');
      setViewMode('account');
    } else {
      toast.error('Invalid credentials. Use username: test, password: test');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    signInForm.reset();
    signUpForm.reset();
    toast.success('You have been successfully signed out.');
  };

  if (viewMode === 'signin') {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-xl">
            <LogIn className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Access your pro account
            </p>
          </div>
        </div>

        {/* Sign In Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  type="text"
                  placeholder="Enter your username"
                  {...signInForm.register("username")}
                />
                {signInForm.formState.errors.username && (
                  <p className="text-xs text-destructive">
                    {signInForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  {...signInForm.register("password")}
                />
                {signInForm.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {signInForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-y-2">
          <Button
            variant="ghost"
            onClick={() => setViewMode('signup')}
            className="text-sm"
          >
            Don't have an account? Sign up
          </Button>
        </div>
      </div>
    );
  }

  if (viewMode === 'signup') {
    return (
      <div className="w-full max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-xl">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">Sign Up</h1>
            <p className="text-sm text-muted-foreground">
              Create your pro account
            </p>
          </div>
        </div>

        {/* Sign Up Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  type="text"
                  placeholder="Choose a username"
                  {...signUpForm.register("username")}
                />
                {signUpForm.formState.errors.username && (
                  <p className="text-xs text-destructive">
                    {signUpForm.formState.errors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  {...signUpForm.register("password")}
                />
                {signUpForm.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="text-center space-y-2">
          <Button
            variant="ghost"
            onClick={() => setViewMode('signin')}
            className="text-sm"
          >
            Already have an account? Sign in
          </Button>
        </div>
      </div>
    );
  }

  // Account view (default)
  if (isLoading) {
    return (
      <div className="w-full">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isAuthenticated ? (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">
                  Pro Account
                </CardTitle>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="h-8 px-3 text-sm"
              >
                Sign Out
              </Button>
            </div>
            <CardDescription className="text-sm">
              Hi, {username}!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Pro Features Active
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full">
          {/* Show signin/signup options when in account view */}
          {onNavigateToAccount ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="w-4 h-4 text-primary" />
                    Pro Account
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Unlock premium features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Access advanced export options, batch processing, and priority support.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setViewMode('signin')}
                        className="flex-1"
                        size="sm"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                      <Button
                        onClick={() => setViewMode('signup')}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // This is the compact view shown in the export page
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-4 h-4 text-primary" />
                  Pro Account
                </CardTitle>
                <CardDescription className="text-sm">
                  Unlock premium features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Access advanced export options, batch processing, and priority support.
                  </p>
                  {onNavigateToAccount && (
                    <Button
                      onClick={onNavigateToAccount}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Manage Account
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

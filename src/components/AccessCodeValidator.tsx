import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Shield } from "lucide-react";

interface AccessCodeValidatorProps {
  onValidated: () => void;
}

const AccessCodeValidator = ({ onValidated }: AccessCodeValidatorProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter an access code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.rpc("validate_access_code", {
        _code: code.trim().toUpperCase(),
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to validate code",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        toast({
          title: "Success",
          description: "Access code validated! You can now start the quiz.",
        });
        onValidated();
      } else {
        toast({
          title: "Invalid Code",
          description: "The access code is invalid, expired, or has reached its usage limit",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error validating code:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Access Code Required</h1>
          <p className="text-muted-foreground">
            Enter your quiz access code to continue
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Access Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && validateCode()}
            />
          </div>

          <Button onClick={validateCode} className="w-full" disabled={loading}>
            {loading ? "Validating..." : "Validate Code"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AccessCodeValidator;

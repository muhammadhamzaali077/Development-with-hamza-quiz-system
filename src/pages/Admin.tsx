import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy, Trash2 } from "lucide-react";

interface AccessCode {
  id: string;
  code: string;
  is_active: boolean;
  max_uses: number | null;
  current_uses: number;
  created_at: string;
  expires_at: string | null;
}

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [maxUses, setMaxUses] = useState<string>("");
  const [expiryDays, setExpiryDays] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roles) {
        setIsAdmin(true);
        loadCodes();
      } else {
        toast({
          title: "Access Denied",
          description: "You must be an admin to access this page",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadCodes = async () => {
    const { data, error } = await supabase
      .from("access_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load access codes",
        variant: "destructive",
      });
    } else {
      setCodes(data || []);
    }
  };

  const generateCode = async () => {
    try {
      const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const codeData: any = {
        code: newCode,
        created_by: user.id,
      };

      if (maxUses) {
        codeData.max_uses = parseInt(maxUses);
      }

      if (expiryDays) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays));
        codeData.expires_at = expiryDate.toISOString();
      }

      const { error } = await supabase.from("access_codes").insert([codeData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to generate code",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Code ${newCode} generated successfully!`,
        });
        setMaxUses("");
        setExpiryDays("");
        loadCodes();
      }
    } catch (error) {
      console.error("Error generating code:", error);
    }
  };

  const deleteCode = async (id: string) => {
    const { error } = await supabase.from("access_codes").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete code",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Code deleted successfully",
      });
      loadCodes();
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Quiz
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Generate Access Code</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxUses">Max Uses (Optional)</Label>
              <Input
                id="maxUses"
                type="number"
                placeholder="Unlimited"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDays">Expires in Days (Optional)</Label>
              <Input
                id="expiryDays"
                type="number"
                placeholder="Never expires"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={generateCode} className="w-full">
            Generate New Code
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Active Codes</h2>
          
          <div className="space-y-2">
            {codes.map((code) => (
              <div
                key={code.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-lg">{code.code}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(code.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Uses: {code.current_uses}
                    {code.max_uses && ` / ${code.max_uses}`}
                    {code.expires_at && ` | Expires: ${new Date(code.expires_at).toLocaleDateString()}`}
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteCode(code.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {codes.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No codes generated yet
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;

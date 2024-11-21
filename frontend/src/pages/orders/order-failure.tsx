import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function OrderFailurePage() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Order Failed</CardTitle>
          <CardDescription>
            We apologize, but there was an issue processing your order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please try again or contact our support team if the problem persists.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

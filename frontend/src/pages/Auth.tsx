import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { loginInstance, registerInstance } from "@/api/apiClient";
import { useNavigate } from "react-router-dom";

const AuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6),
});
export type AuthRequest = z.infer<typeof AuthSchema>;

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>();
  const navigate = useNavigate();

  const onLoginSubmit = (data: AuthRequest) => {
    loginInstance(data.email, data.password);
    navigate("/todo");
  };

  const onRegisterSubmit = (data: AuthRequest) => {
    registerInstance(data.email, data.password);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 my-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit(onLoginSubmit)}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      placeholder="m@example.com"
                      required
                    />
                    {errors.email ? (
                      <div className="text-red-500">
                        {errors.email?.message}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      required
                    />
                    {errors.password ? (
                      <div className="text-red-500">
                        {errors.password?.message}
                      </div>
                    ) : null}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit(onRegisterSubmit)}>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      placeholder="m@example.com"
                      required
                    />
                    {errors.email ? (
                      <div className="text-red-500">
                        {errors.email?.message}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      type="password"
                      required
                    />
                    {errors.password ? (
                      <div className="text-red-500">
                        {errors.password?.message}
                      </div>
                    ) : null}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full" type="submit">
                    Register
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Auth;

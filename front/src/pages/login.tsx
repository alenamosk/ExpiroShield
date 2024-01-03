import NavBar from "@/components/NavBar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LogoLink from "@/components/LogoLink";

const dataFromFormValidator = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
});

type DataFromForm = z.infer<typeof dataFromFormValidator>;

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFromForm>({
    resolver: zodResolver(dataFromFormValidator),
  });

  const handleFormSubmit = async (data: DataFromForm) => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Login Successful:", jsonResponse);
        localStorage.setItem("token", jsonResponse.token);
        router.push("/main");
      } else {
        console.log("Login failed:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
    }
  };

  return (
    <>
      <LogoLink />
      <header>
        <h1>Login</h1>
      </header>

      <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="username">Email</label>
        <input id="email" {...register("email")} type="text" />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input id="password" {...register("password")} type="password" />
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}

        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;

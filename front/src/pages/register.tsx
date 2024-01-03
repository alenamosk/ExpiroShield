import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const dataFromFormValidator = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
});

type DataFromForm = z.infer<typeof dataFromFormValidator>;

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataFromForm>({
    resolver: zodResolver(dataFromFormValidator),
  });

  const handleFormSubmit = async (data: DataFromForm) => {
    console.log(data);

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <header>
        <h1>Register</h1>
      </header>

      <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="username">Email</label>
        <input id="username" {...register("email")} type="text" />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input id="password" {...register("password")} type="text" />
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;

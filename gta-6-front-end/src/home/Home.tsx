import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Home.module.css";

interface IFormState {
  name: string;
  email: string;
}

function Home() {
  const { register, handleSubmit, reset } = useForm<IFormState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true);
    fetch("http://localhost:5001/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data) return;
        setIsSuccess(true);
        reset();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Your request has been accepted</div>
        ) : (
          <>
            <h1>GTA 6 - Leave your details</h1>
            <input
              required
              type="email"
              placeholder="Enter your email:"
              {...register("name")}
            />
            <input
              required
              type="text"
              placeholder="Enter your name:"
              {...register("email")}
            />
            <button disabled={isLoading}>
              {isLoading ? "Loading" : "Notify me"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;

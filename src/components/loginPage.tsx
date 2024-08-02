
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './loginPage.module.scss'; 

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post<{ token: string }>('https://dummyjson.com/auth/login', {
        username: data.username,
        password: data.password,
      });
      console.log('API response:', response.data); 
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); 
        navigate('/products'); 
      } else {
        alert('Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed, please check your credentials.');
    }
  };

  return (
    <div className={styles.logincontainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={styles.label}>Username</label>
          <input type="text" id="username" {...register('username')} />
          {errors.username && <p className={styles.errors}>{errors.username.message}</p>}
        </div>
        <div>
          <label className={styles.label}>Password</label>
          <input type="password" id="password" {...register('password')} />
          {errors.password && <p className={styles.errors}>{errors.password.message}</p>}
        </div>
        <button className={styles.buttonlogin} type="submit">Login</button>
      </form>
    </div>
  );
};



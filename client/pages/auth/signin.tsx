import Notification from '@/components/Notification';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { setAuthState, setUserData } from "@/store/reducers/index";
import { useAppDispatch } from "@/store/store";
import Link from 'next/link';
import Button from '@/components/Button';
import { setAuthToken } from '@/utils/auth';

interface NotificationProps {
  visible: boolean;
  icon: React.ReactNode;
  title: string;
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
  autoCloseDelay: number;
}

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationProps>({
    visible: false,
    icon: null,
    title: '',
    type: 'success',
    onClose: () => { },
    message: '',
    autoCloseDelay: 3000
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch('http://localhost:5000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        })
      })
      const result = await response.json();
      setNotification({
        visible: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        title: 'Sign In Success',
        message: 'You have successfully signed in.',
        onClose: () => setNotification(prev => ({ ...prev, visible: false })),
        type: 'success',
        autoCloseDelay: 3000
      });
      // Redirect or perform any other action on successful sign-in
      dispatch(setAuthState(true));
      
      router.push('/dashboard');

      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setNotification({
        visible: true,
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5 mr-2 mt-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
        title: 'Sign In Error',
        message: error,
        onClose: () => setNotification(prev => ({ ...prev, visible: false })),
        type: 'error',
        autoCloseDelay: 3000
      });
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="relative flex sm:w-full sm:max-w-sm flex-col bg-white shadow-sm border border-slate-200 lg:w-96 rounded-lg my-6">
          <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-slate-800">
            <h3 className="text-2xl">
              Sign In
            </h3>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm  gap-3 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="abc@gmail.com"
                  autoComplete="email"
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Password
                </label>
                <input 
                id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  autoComplete="current-password" 
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"/>
              </div>

              <div className="inline-flex items-center mt-2">
                <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                  <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id="check-2" />
                  <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                </label>
                <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                  Remember Me
                </label>
              </div>
              <div className="p-6 pt-0">
                {
                  isLoading ?
                    <button disabled={isLoading} className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-[20px]" type="submit">
                      Signing in...
                    </button> :
                    <button className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none text-[20px]" type="submit">
                      Sign In
                    </button>
                }

                <p className="flex justify-center mt-6 text-sm text-slate-600">
                  Don&apos;t have an account?
                  <Link href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

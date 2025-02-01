import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link, Links } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {signUp, isSigningUp} = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length<6) return toast.error("Password must be at least 6 characters");
    return true;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success===true) signUp(formData);
  };




  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*left side*/}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="input input-bordered flex items-center gap-2">
            <svg
             xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
            <path
            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} className="grow" placeholder="Username" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} className="grow" placeholder="Email" />
           </label>
           <label className="input input-bordered flex items-center gap-2">
            <div className="text-xl w-[16px] h-[16px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>
            </div>
            <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} className="grow" placeholder="Password" />
            <label onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff/>
            ) : (
              <Eye/>
            )}
            </label>

           </label>





            <button className="btn btn-primary w-full flex items-center justify-center" type="submit" disabled={isSigningUp} name="submit">
              {isSigningUp ? (
                <>
                <Loader2 className="animate-spin mr-2" />
                Loading...
                </>
              )
               : "Create account"}

            </button>
            <div className="text-center">
              <div className="text-base-center">
                Already have an account?{" "}
                <Link className="link link-primary" to="/login">Log in</Link>
              </div>
            </div>



          </form>

        </div>

      </div>
      {/*Right side*/}
      <AuthImagePattern title="Join our community" subtitle="connect with friends,share moments, and create memories" />
    </div>


  );
};
export default SignUpPage;
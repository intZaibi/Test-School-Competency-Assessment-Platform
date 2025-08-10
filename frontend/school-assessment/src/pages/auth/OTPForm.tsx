import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Loader2 } from "lucide-react";
import { getUserInfo, resendOTP, verifyOTP } from "../../features/api/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/slicers/authSlice";

export default function OTPVerificationForm() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      setError("Something went wrong!");
      navigate('/login');
    }
    if (!otp) {
      setError("Please enter a valid OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOTP(user?.email, otp);
      if (res.error) throw new Error(res.error);
      else navigate('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : "Verify OTP failed!");
    } finally {
      setLoading(false);
    }
  };
  // console.log(user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await getUserInfo();
      if (res.error) throw new Error(res.error);
      else dispatch(setUser(res));
    };
    fetchUserInfo();
  }, []);

  const handleResendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      setError("Please enter a valid email");
      return;
    }
    try {
      const res = await resendOTP(user?.email);
      console.log(res);
      if (res.error) throw new Error(res.error);
      else navigate('/otp');
    } catch (error) {
      setError(error instanceof Error ? error.message : "Resend OTP failed!");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative w-full max-w-md">
        <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {window.location.pathname === '/login' && 'Welcome Back'}
              {window.location.pathname === '/register' && 'Create Account'}
              {window.location.pathname === '/verify' && 'Verify Email'}
              {window.location.pathname === '/forgot-password' && 'Reset Password'}
            </h1>
            <p className="text-slate-400 mb-4">
              {window.location.pathname === '/login' && 'Login to your account'}
              {window.location.pathname === '/register' && 'Create an account'}
              {window.location.pathname === '/verify' && 'Verify your email'}
              {window.location.pathname === '/forgot-password' && "Reset your password"}
            </p>


            <form onSubmit={handleVerify} className="flex flex-col gap-4">
              <Input required placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              {error && <p className="text-red-400">{error}</p>}
              <Button type="submit" disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}</Button>
            </form>

            <div className="mt-2 text-sm flex items-center justify-center gap-2">
              <button onClick={handleResendOTP} className="cursor-pointer text-slate-400 hover:text-slate-300">Resend OTP</button>
              <button onClick={() => navigate('/login')} className="cursor-pointer text-slate-400 hover:text-slate-300">Back to Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

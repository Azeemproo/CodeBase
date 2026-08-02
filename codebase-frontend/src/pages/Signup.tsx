export default function Signup({ handleSubmit, message }: any) {
  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center px-6 font-['Inter',sans-serif]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-[#232935] bg-[#11151c] p-8"
      >
        {/* logo mark */}
        <div className="flex flex-col items-center mb-6">
          <div className="font-['IBM_Plex_Mono',monospace] text-2xl font-bold text-[#e3b341] mb-2">
            {"</>"}
          </div>
          <h3 className="font-['IBM_Plex_Mono',monospace] text-xl font-semibold !text-[#e6edf3]">
            Create your account
          </h3>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-['IBM_Plex_Mono',monospace] text-[#8b949e] mb-1.5">
            Username
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. azeem"
            className="w-full bg-[#0b0e14] border border-[#232935] rounded-md px-4 py-2.5 text-[#e6edf3] placeholder-[#5c6370] focus:outline-none focus:border-[#e3b341] transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-['IBM_Plex_Mono',monospace] text-[#8b949e] mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full bg-[#0b0e14] border border-[#232935] rounded-md px-4 py-2.5 text-[#e6edf3] placeholder-[#5c6370] focus:outline-none focus:border-[#e3b341] transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full font-['IBM_Plex_Mono',monospace] bg-[#e3b341] text-[#0b0e14] font-semibold py-2.5 rounded-md hover:bg-[#f0c869] transition-colors"
        >
          Sign up
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-[#8b949e]">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-[#5c6370]">
          Already have an account?{" "}
          <a href="/Login" className="text-[#58a6ff] hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}



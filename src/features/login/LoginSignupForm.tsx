import type { Tab } from './LoginSignup';

type LoginSignupFormProps = {
    email: string;
    password: string;
    passwordRepeat: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setPasswordRepeat: (passwordRepeat: string) => void;
    tabSelected: Tab;
    submitData: () => void;
    error: string;
};

export default function LoginSignupForm({
    email,
    password,
    passwordRepeat,
    setEmail,
    setPassword,
    setPasswordRepeat,
    tabSelected,
    submitData,
    error
}: LoginSignupFormProps) {

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submitData();
    }

    return (
        <form
            className="flex flex-col gap-6 pb-[16%] w-[80%] md:w-[60%]"
            onSubmit={submitForm}
        >
            <div className="relative w-full">
                <input
                    id="email"
                    type="email"
                    name="email"
                    className="peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder=" "
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label
                    htmlFor="email"
                    className="absolute text-gray-500 duration-200 transform -translate-y-6 scale-75 top-2 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Email
                </label>
            </div>
            <div className="relative w-full">
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                    placeholder=" "
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label
                    htmlFor="password"
                    className="absolute text-gray-500 duration-200 transform -translate-y-6 scale-75 top-2 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Password
                </label>
            </div>
            {tabSelected === 'Signup' ? (
                <div className="relative w-full">
                    <input
                        id="passwordRepeat"
                        type="password"
                        name="password"
                        className="peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600"
                        placeholder=" "
                        required
                        value={passwordRepeat}
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                    <label
                        htmlFor="passwordRepeat"
                        className="absolute text-gray-500 duration-200 transform -translate-y-6 scale-75 top-2 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Repeat password
                    </label>
                </div>
            ) : (
                ''
            )}

            <button
                type="submit"
                className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 active:bg-gray-600 transition-colors"
            >
                {tabSelected}
            </button>
            <p className="text-red-600 text-center">{error}</p>
        </form>
    );
}

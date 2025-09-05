import { useRef, useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';

type PopoverProps = {
    isOpen: boolean;
    closeHandler: () => void;
};

type Tab = 'Login' | 'Signup';

export default function Popover({ isOpen, closeHandler }: PopoverProps) {
    const { signup, login } = useAuth();
    const popoverRef = useRef<HTMLDivElement>(null);
    const [tabSelected, setSelectedTab] = useState<Tab>('Login');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                closeHandler();
            }
        }
        
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') closeHandler();
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, closeHandler]);

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(`xxx submit email: ${email} password: ${password}`)

        if (tabSelected === 'Signup' && password === passwordRepeat) {
            signup(email, password).then(() => closeHandler());
        } else if (tabSelected === 'Login') {
            login(email, password).then(() => closeHandler());
        }

        setEmail('');
        setPassword('');
        setPasswordRepeat('');
    }

    if (!isOpen) return null;

    return (
        <div className='flex justify-center items-center min-h-full'>
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                <div
                    ref={popoverRef}
                    className='bg-white flex flex-col rounded-2xl w-[80vw] md:w-[32vw] h-[60vh] md:h-[50vh] max-w-3xl overflow-auto'
                >
                    <div className='flex flex-col h-full'>
                        <div className='flex justify-evenly py-4'>
                                <button
                                    className={`text-gray-600 flex-1 pb-4 text-md ${tabSelected === 'Login' ? 'border-b-2 border-gray-800' : 'border-b-2 border-white'}`}
                                    onClick={() => setSelectedTab('Login')}
                                >
                                    Login
                                </button>
                            <button
                                className={`text-gray-600 flex-1 pb-4 text-md ${tabSelected === 'Signup' ? 'border-b-2 border-gray-800' : 'border-b-2 border-white'}`}
                                onClick={() => setSelectedTab('Signup')}
                            >
                                Signup
                            </button>
                        </div>
                        <div className='flex justify-center items-center h-full'>
                            <form className='flex flex-col gap-6 pb-[16%] w-[80%] md:w-[60%]' onSubmit={submitForm}>
                                <div className='relative w-full'>
                                    <input 
                                        id='email' 
                                        type='email' 
                                        name='email'
                                        className='peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600' 
                                        placeholder=' '
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label
                                        htmlFor='email'
                                        className="absolute text-gray-500 duration-200 transform -translate-y-6 scale-75 top-2 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className='relative w-full'>
                                    <input 
                                        id='password' 
                                        type='password' 
                                        name='password'
                                        className='peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600' 
                                        placeholder=' '
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <label
                                        htmlFor='password'
                                        className="absolute text-gray-500 duration-200 transform -translate-y-6 scale-75 top-2 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Password
                                    </label>
                                </div>
                                {tabSelected === 'Signup'
                                    ?   <div className='relative w-full'>
                                            <input 
                                                id='passwordRepeat' 
                                                type='password' 
                                                name='password'
                                                className='peer h-10 w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600' 
                                                placeholder=' '
                                                required
                                                value={passwordRepeat}
                                                onChange={(e) => setPasswordRepeat(e.target.value)} />
                                            <label
                                                htmlFor='passwordRepeat'
                                                className="absolute text-gray-500 duration-200 transform -translate-y-6 scale-75 top-2 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Repeat password
                                            </label>
                                        </div>
                                    : ''}

                                <button
                                    type='submit'
                                    className='mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 active:bg-gray-600 transition-colors'
                                    >
                                        {tabSelected}
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

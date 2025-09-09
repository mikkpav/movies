import { useState } from 'react';
import useLoginSignup from '../../hooks/useLoginSignup';
import LoginSignupForm from './LoginSignupForm';

export type Tab = 'Login' | 'Signup';

type LoginSignupProps = {
    closeHandler: () => void;
};

export default function LoginSignup({ closeHandler }: LoginSignupProps) {
    const { error, clearError, startLogin, startSignup } = useLoginSignup();
    const [tabSelected, setSelectedTab] = useState<Tab>('Login');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');

    function clearFields() {
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
    }

    function selectTab(tab: Tab) {
        clearError();
        setSelectedTab(tab);
    }

    async function submitData() {
        if (tabSelected === 'Signup') {
            const success = await startSignup(email, password, passwordRepeat);
            if (success) {
                clearFields();
                closeHandler();
            }
        } else if (tabSelected === 'Login') {
            console.log('>> before startLogin')
            const success = await startLogin(email, password);
            console.log('>> after startLogin success: ', success)
            if (success) {
                clearFields();
                closeHandler();
            }
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-evenly py-4">
                <button
                    className={`text-gray-600 flex-1 pb-4 text-md ${
                        tabSelected === 'Login'
                            ? 'border-b-2 border-gray-800'
                            : 'border-b-2 border-white'
                    }`}
                    onClick={() => selectTab('Login')}
                >
                    Login
                </button>
                <button
                    className={`text-gray-600 flex-1 pb-4 text-md ${
                        tabSelected === 'Signup'
                            ? 'border-b-2 border-gray-800'
                            : 'border-b-2 border-white'
                    }`}
                    onClick={() => selectTab('Signup')}
                >
                    Signup
                </button>
            </div>
            <div className="flex justify-center items-center h-full">
                <LoginSignupForm
                    email={email}
                    password={password}
                    passwordRepeat={passwordRepeat}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setPasswordRepeat={setPasswordRepeat}
                    tabSelected={tabSelected}
                    submitData={submitData}
                    error={error}
                />
            </div>
        </div>
    );
}

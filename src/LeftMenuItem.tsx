import { Link } from 'react-router-dom';

type LeftMenuItemProps = {
    to: string,
    children: React.ReactNode
}

export default function LeftMenuItem({ to, children }: LeftMenuItemProps) {
    return (
        <Link 
            to={to}
            className='bg-white hover:bg-gray-100 hover:rounded-lg p-2'>
            {children}
        </Link>
    );
}
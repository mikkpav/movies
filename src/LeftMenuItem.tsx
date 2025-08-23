import { NavLink } from 'react-router-dom';

type LeftMenuItemProps = {
    to: string,
    children: React.ReactNode
}

export default function LeftMenuItem({ to, children }: LeftMenuItemProps) {
    return (
        <NavLink 
            to={to}
            className={({ isActive }) =>
                `p-2 rounded-md ${isActive ? 'bg-gray-100 hover:bg-gray-100' : 'bg-white hover:bg-gray-50'}`
            }>
            {children}
        </NavLink>
    );
}
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

type LeftMenuItemProps = {
    to: string,
    disabled?: boolean,
    children: React.ReactNode
}

export default function LeftMenuItem({ to, disabled = false, children }: LeftMenuItemProps) {
    if (disabled) {
        return (
            <div
                data-tooltip-id='tooltip'
                data-tooltip-content='Login to save favorites'
            >
                <div
                    className='flex items-center h-12 p-2 rounded-md bg-gray-100 opacity-50 cursor-default'
                >
                    {children}
                </div>
                <Tooltip id='tooltip'/>
            </div>
        );
    }

    return (
        <NavLink 
            to={to}
            className={({ isActive }) =>
                `h-12 p-2 rounded-md ${isActive ? 'bg-gray-100 hover:bg-gray-100' : 'bg-white hover:bg-gray-50'}`
            }>
            {children}
        </NavLink>
    );
}
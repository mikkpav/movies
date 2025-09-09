import { useRef, useEffect, type ReactNode } from 'react';

type PopoverProps = {
    isOpen: boolean;
    closeHandler: () => void;
    children?: ReactNode;
};

export default function Popover({ isOpen, closeHandler, children }: PopoverProps) { 
    const popoverRef = useRef<HTMLDivElement>(null);
    
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

    if (!isOpen) return null;

    return ( 
        <div className='flex justify-center items-center min-h-full'>
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                <div
                    ref={popoverRef}
                    className='bg-white flex flex-col rounded-2xl w-[80vw] md:w-[32vw] h-[60vh] md:h-[50vh] max-w-3xl overflow-auto'
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
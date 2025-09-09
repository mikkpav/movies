import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type AlertProps = {
    isOpen: boolean,
    title: string;
    description: string;
    actionTitle?: string,
    cancelTitle?: string,
    actionHandler?: () => void;
    cancelHandler?: () => void;
    closeHandler: () => void;
};

export default function Alert({ isOpen, title, description, actionTitle='OK', cancelTitle='Cancel', actionHandler, cancelHandler, closeHandler }: AlertProps) {
    const handleMainAction = () => {
        actionHandler?.();
        closeHandler();
    };

    const handleCancelAction = () => {
        cancelHandler?.();
        closeHandler();
    };

    const handleClose = (() => {
        closeHandler();
    });

    return (
        <Dialog open={isOpen} onClose={handleClose} className='relative z-50'>
            <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                <DialogPanel className='max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-xl'>
                    <DialogTitle className='font-bold'>{title}</DialogTitle>
                    <Description className='pb-4'>{description}</Description>
                    <div className='flex gap-4'>
                        <button
                            onClick={handleMainAction}
                            className='bg-black text-white py-2 px-4 rounded-md font-semibold cursor-pointer'
                        >
                            {actionTitle}
                        </button>
                        <button
                            onClick={handleCancelAction}
                            className='cursor-pointer'
                        >
                            {cancelTitle}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

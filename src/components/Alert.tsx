import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';

type AlertProps = {
    isOpen: boolean,
    title: string;
    description: string;
    actionHandler: () => void;
    cancelHandler?: () => void;
    closeHandler: () => void;
};

export default function Alert({ isOpen, title, description, actionHandler, cancelHandler, closeHandler }: AlertProps) {
    const handleMainAction = () => {
        actionHandler();
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
        <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-6 border bg-white p-12">
                    <DialogTitle className="font-bold">{title}</DialogTitle>
                    <Description className="pb-4">{description}</Description>
                    <div className="flex gap-4">
                        <button
                            onClick={handleMainAction}
                            className="font-semibold cursor-pointer"
                        >
                            Log out
                        </button>
                        <button
                            onClick={handleCancelAction}
                            className="cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

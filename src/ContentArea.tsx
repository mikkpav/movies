
type ContentAreaProps = {
    children?: React.ReactNode
};

export default function ContentArea({ children }: ContentAreaProps) {
    return (
        <div className='flex flex-3'>
            {children}
        </div>
    );
}
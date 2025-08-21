import LeftMenuItem from './LeftMenuItem';

export default function LeftMenu() {
    return (
        <div className='flex flex-col flex-1 text-lg gap-2'>
            <LeftMenuItem to='/'>Popular</LeftMenuItem>
            <LeftMenuItem to='/favorites'>Favorites</LeftMenuItem>
        </div>
    )
}
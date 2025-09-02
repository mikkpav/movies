import type { DropdownItem } from './SearchDropdown'
import PosterIcon from '../assets/poster-icon.png';
import { getYearFromDate } from '../utils/formats';

type SearchDropdownItemProps = {
    item: DropdownItem,
    itemIndex: number,
    selectedIndex: number,
    onSelect: (item: DropdownItem) => void,
    onMouseHover: (index: number) => void
}

export default function SearchDropdownItem({ item, itemIndex, selectedIndex, onSelect, onMouseHover }: SearchDropdownItemProps) {
    return (
        <li
            key={item.id}
            className={`p-3 hover:bg-gray-100 cursor-pointer overflow-hidden ${itemIndex === selectedIndex ? 'bg-gray-100' : ''}`}
            onClick={() => onSelect(item)}
            onMouseEnter={() => onMouseHover(itemIndex)}
            onMouseLeave={() => onMouseHover(-1)}
        >
            <article className='flex h-30 gap-2'>
                <img src={item.imageUrl ?? PosterIcon} className='object-contain rounded-xl'></img>
                <div className='flex items-center gap-4'>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 justify-between'>
                            <h1 className='font-list-item-title line-clamp-1'>{item.title}</h1>
                            {item.date && <p className='font-list-item-title'>{getYearFromDate(item.date)}</p>}
                        </div>
                        <p className='line-clamp-3 font-list-item-content'>{item.subtitle}</p>
                    </div>
                    
                </div>
            </article>
        </li>
    );
}
import { useContext } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { Info, ListOrdered, PlusCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/app/components/ui/tooltip';

const EditSeriesTabs = () => {
  const localStore = useContext(EditSeriesContext);
  if (!localStore) return <></>;
  const { tab, setTab } = localStore;
  const selected =
    'inline-block p-4 text-primary bg-gray-100 hover:cursor-pointer rounded-t-lg active dark:bg-gray-800 dark:text-blue-500';
  const unselected =
    'inline-block p-4 rounded-t-lg hover:cursor-pointer hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300';

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li className="me-2" onClick={() => setTab('details')}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={tab === 'details' ? selected : unselected}>
                <Info />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
      <li className="me-2" onClick={() => setTab('events')}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={tab === 'events' ? selected : unselected}>
                <ListOrdered />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rearrange Events</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
      <li className="me-2" onClick={() => setTab('add')}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={tab === 'add' ? selected : unselected}>
                <PlusCircle />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    </ul>
  );
};

export default EditSeriesTabs;

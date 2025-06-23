import React, { useState } from 'react';
import './NoteScreen.css';
import NoteTable from './NoteTable';
import NoteModal from './NoteModal';
// import SortingTable from './SortingTable';
// import PaginationTable from './paginationTable';
// import SelectedFlatRow from './SelectedFlatRow';
// import ColumnHiding from './ColumnHiding';

const NoteScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
     <>
   <div className="command-bar">
  <div className="command-bar-inner">
    {/* Left */}
    <div className="text-white flex gap-2 items-center">
      <span className="text-lg font-bold">+</span>
      <h1 className="opacity-80 m-1">Note Screen</h1>
    </div>


    {/* Right */}
    <div className="text-white flex gap-2 items-center h-10">
      <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Note Modal
                        </button>
    </div>
  </div>
</div>
<NoteTable/>
{/* <SortingTable/> */}
{/* <PaginationTable/> */}
{/* <SelectedFlatRow/> */}
{/* <ColumnHiding/> */}
<NoteModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />


     </>
    );
}

export default NoteScreen;
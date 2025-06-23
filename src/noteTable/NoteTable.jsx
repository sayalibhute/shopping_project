import React,{useMemo,useEffect,useState} from 'react';
import {useTable} from 'react-table';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchUsers ,fetchUsersDelete} from '../redux/slices/Userslice';
import { ToastContainer, toast } from 'react-toastify';
import NoteModal from './NoteModal';

// const columns = [
 
//     {
//         Header: "Full Name",
//         accessor: "name"
//     },
//     {
//         Header: "Email",
//         accessor: "email"
//     },
//     {
//         Header: "IP Address",
//         accessor: "address"
//     },
//     {
//         Header: "Phone",
//         accessor: "mobileNo"
//     }
// ];

const columnsinfo = [
 
    {
        Header: "Full Name",
        accessor: "name"
    },
    {
        Header: "Email",
        accessor: "email"
    },
   {
    Header:"info//one cloumen",
    columns:[
       {
        Header: "IP Address",
        accessor: "address"
    },
    {
        Header: "Phone",
        accessor: "mobileNo"
    }
    ]
   }
];

const NoteTable = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [userToEdit, setUserToEdit] = useState(null);
  const users = useSelector((state) => state.notes.users); 
  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);
  const data = useMemo(() => users, [users]);
  const tableColumns = useMemo(() => columnsinfo, []);
  const tableInstance = useTable({ columns: tableColumns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance; 

  const handleDelete = (_id) => {
    dispatch(fetchUsersDelete(_id)).then(() => {
      dispatch(fetchUsers());
      toast.success('User deleted successfully');
    }).catch(() => {
      toast.error('Failed to delete user');
    });
  };

  const handleEdit = (user) => {
    setUserToEdit(user)
    setIsModalOpen(true);
  };

   const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToEdit(null);
    dispatch(fetchUsers());
  };


  return (
    <>
    
      <ToastContainer position="top-right" autoClose={2000} />

      
      <NoteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userToEdit={userToEdit}
        onSave={handleModalClose}
      />
      <div className="bg-[#2a2e57] text-white p-4 rounded-lg shadow-md overflow-auto mt-[175px]">

        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <table {...getTableProps()} className="min-w-full bg-[#23264a] rounded-lg">
          <thead style={{ display: 'block', width: '104%' }}>
            {headerGroups.map((headerGroup)=>(
              <tr {...headerGroup.getHeaderGroupProps()}style={{ display: 'table', width: '77%', tableLayout: 'fixed' }}>
                {
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="px-4 py-2 text-left text-white font-semibold">
                    {column.render('Header')}
                  </th>
                ))
                }
              </tr>
            ))}

          </thead>
          <tbody {...getTableBodyProps()}
            style={{ display: 'block', height: '400px', overflowY: 'auto', width: '100%', }}>
            {rows.length === 0 ? (
              <div>
                <span className="text-center py-4 text-gray-300 justify-center items-center flex w-full mt-[10%]">
                  Data not found
                </span>
              </div>
            ) : (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}
                    className="hover:bg-[#113a7d] transition-colors duration-200"
                    style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                    {
                    row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-2 border-b border-gray-700">
                        {cell.render('Cell')}
                      </td>
                    ))
                    }

                    <td className="px-4 py-2 border-b border-gray-700">
                      <button
                        className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600 hover:text-white mr-[10px]"
                        onClick={() => handleEdit(row.original)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-black p-2 rounded hover:bg-red-600"
                        onClick={() => handleDelete(row.original._id)}> Delete</button>
                    </td>
                  </tr>
                )

              })
            )}
            
                      </tbody>
          </table>
      </div>
    </>
  );
};

export default NoteTable;

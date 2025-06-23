import React,{useMemo,useEffect} from 'react';
import {useTable} from 'react-table';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchUsers ,fetchUsersDelete} from '../redux/slices/Userslice';
import { ToastContainer, toast } from 'react-toastify';

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

  return (
    <>
    
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="bg-[#2a2e57] text-white p-4 rounded-lg shadow-md overflow-auto mt-[152px]">

        <h2 className="text-2xl font-bold mb-4">Notes</h2>
        <table {...getTableProps()} className="min-w-full bg-[#23264a] rounded-lg">
          <thead>
              {headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
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
          <tbody {...getTableBodyProps()}>
            {
              rows.map(row=>{
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-[#113a7d] transition-colors duration-200">
                  {
                    row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-2 border-b border-gray-700">
                        {cell.render('Cell')}
                      </td>
                    ))
                  }
                  
                    <td className="px-4 py-2 border-b border-gray-700">
                      <button
                        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-[10px]'
                       
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 text-white p-2 rounded hover:bg-red-600'
                        onClick={() => handleDelete(row.original._id)}>Delete </button>
                    </td>
                </tr>
              )

              })
            }
          
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NoteTable;

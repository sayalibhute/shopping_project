import React,{useMemo,useEffect} from 'react';
import {useTable,usePagination} from 'react-table';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchUsers } from '../redux/slices/Userslice';

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

const PaginationTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.notes.users); 
  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);
  const data = useMemo(() => users, [users]);
  const tableColumns = useMemo(() => columnsinfo, []);
  const tableInstance = useTable({ columns: tableColumns, data ,initialState:{pageIndex:1} },usePagination);

  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, pageOptions,state,gotoPage,PageCount,setPageSize, canNextPage, canPreviousPage, prepareRow } = tableInstance;
  const { pageIndex,pageSize } = state;
  return (
    <>
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
              page.map(row=>{
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
                </tr>
              )

              })
            }
          
          </tbody>
        </table>
        <div>
            <span>
                page{''}
                <strong>{pageIndex + 1} of {pageOptions.length}</strong> {''}
            </span>
            <span>
                | Go to page:{' '}
                <input
                    type='number'
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(pageNumber);
                    }}
                    style={{
                        width: '50px',
                        padding: '5px',
                        color: 'black',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {[5, 10, 20, 50].map(size => (
                    <option key={size} value={size} className='bg-white text-black'>
                        Show {size}
                    </option>
                ))}
            </select>
            <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-[10px]' onClick={()=>gotoPage(0)} disabled={!canPreviousPage} >{'<<'}</button>
           <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-[10px]' onClick={()=>previousPage()} disabled={!canPreviousPage} >Previous</button>
           <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-[10px]' onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            <button className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-[10px]' onClick={()=>gotoPage(PageCount-1)} disabled={!canNextPage} >{'>>'}</button>

        </div>
      </div>
    </>
  );
};

export default PaginationTable;

import React,{useMemo,useEffect} from 'react';
import {useTable,useSortBy,useGlobalFilter,useFilters} from 'react-table';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchUsers } from '../redux/slices/Userslice';
import GlobalFilter from './GlobalFilter';

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

const SortingTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.notes.users); 
  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);
  const data = useMemo(() => users, [users]);
  const tableColumns = useMemo(() => columnsinfo, []);
  const tableInstance = useTable({ columns: tableColumns, data },useFilters,useGlobalFilter,useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows,state,setGlobalFilter, prepareRow } = tableInstance;
  const { globalFilter } = state;
  return (
    <>
      <div className="bg-[#2a2e57] text-white p-4 rounded-lg shadow-md overflow-auto mt-[152px]">

        <h2 className="text-2xl font-bold mb-4">Notes</h2>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <table {...getTableProps()} className="min-w-full bg-[#23264a] rounded-lg">
          <thead>
              {headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-left text-white font-semibold">
                    {column.render('Header')}

                    <span>{column.isSorted?(column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  
                  
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

export default SortingTable;

import React,{useMemo,useEffect} from 'react';
import {useTable,useRowSelect} from 'react-table';
import { useSelector ,useDispatch} from 'react-redux';
import { fetchUsers } from '../redux/slices/Userslice';
import CheckBox from './checkBox';

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

const SelectedFlatRow = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.notes.users); 
  useEffect(() => {
    dispatch(fetchUsers()); 
  }, [dispatch]);
  const data = useMemo(() => users, [users]);
  const tableColumns = useMemo(() => columnsinfo, []);
  const tableInstance = useTable({ columns: tableColumns, data },useRowSelect,(hooks)=>{
    hooks.visibleColumns.push((columns) => {
        return [
            {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                <CheckBox  {...getToggleAllRowsSelectedProps()} />
                </div>
            ),
            Cell: ({ row }) => (
                <div>
                <CheckBox  {...row.getToggleRowSelectedProps()} />
                </div>
            )
            },
            ...columns
        ];
    }
  )});

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  const firstPageRows = rows.slice(0, 10); // Adjust the number of rows per page as needed
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
              firstPageRows.map(row=>{
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
        {/* <pre>
            <code>
                {JSON.stringify(
                    {
                        SelectedFlatRow: SelectedFlatRow?.map((row) => row.original)
                    },
                    null,
                    2
                )}
            </code>
        </pre> */}
      </div>
    </>
  );
};

export default SelectedFlatRow;

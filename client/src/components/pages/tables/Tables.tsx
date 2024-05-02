import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Tables.css';

// Define table data type
export interface TableData {
  id: number;
  number: string;
  table_reference: string;
  status: string;
}

// Table component
const Tables: React.FC = () => {
    const [tableData, setTableData] = useState<TableData[]>([]);
    
    const fetchTableData = async (): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/tables`;
        const response = await axios.get<TableData[]>(apiUrl);
        setTableData(response.data);
    }

    const deleteTable = async (number: string): Promise<void> => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/tables/${number}`;
        await axios.delete(apiUrl);
        alert('Table deleted successfully');
        fetchTableData(); // Fetch the data again after deleting a table
    }

    // Fetch Table data
    useEffect(() =>{
      fetchTableData();
    }, [])

  return (
    <div>
        <h2 className="table-title">Serving Tables</h2> {/* Add table title */}
        <div className="table-container">
        <button className="create-button"><Link to={"/tables/create"} className='link'>Create</Link></button>
        <div className="table-wrapper">
            {tableData.map(item => (
            <div key={item.number} className="table-row">
                <div className="title-column">
                  <Link 
                    to={`/tables/${item.number}`} 
                  >
                    {item.number}
                  </Link>
                </div>
                <div className="action-column">
                <button className="edit-button">
                  <Link 
                    to={`/tables/edit/${item.number}`}
                    state={item}
                    className='link'
                  >
                    Edit
                  </Link>
                </button>
                <button className="delete-button" onClick={() => deleteTable(item.number)}>Delete</button>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default Tables;
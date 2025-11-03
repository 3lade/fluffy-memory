import React from 'react'

function TodoList({tools, removeTool}) {

    if(tools.length === 0)
    {
        return (
            <p>no tools lent yet</p>
        )
    }

  return (
    
    <div>
        <table className='tool-table'>
            <thead>
                <tr>
                    <th>Borrower</th>
                    <th>Tool Name</th>
                    <th>Date Lent</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tools.map((tool) => (
                        <tr key={tool.id}>
                            <td>{tool.borrower}</td>
                            <td>{tool.toolName}</td>
                            <td>{tool.dateLent}</td>
                            <td>
                                <button onClick={() => {removeTool(tool.id)}} className='remove-btn'>Remove</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default TodoList
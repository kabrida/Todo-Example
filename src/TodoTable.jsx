function TodoTable(props) {
    return (
        <table>
            <tbody>
                {props.todos.length > 0 && (
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                </tr>
                )}
                {props.todos.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.description}</td>
                        <td>
                            <button onClick={() => props.deleteTodo(index)}>Done</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;
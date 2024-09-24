function TodoTable(props) {
    return (
        <table>
            <tbody>
                {props.todos.map((item, index) => (
                    <tr key={index}>
                        <td>{item}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;
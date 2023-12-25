import React, { useState } from "react";
import TodoItem from "./guest.js";

// function TodoList() {
//     const [tasks, setTasks] = useState([
//         {
//             id: 1,
//             text: 'Doctor Appointment',
//             completed: true
//         },
//         {
//             id: 2,
//             text: 'Meeting at School',
//             completed: false
//         }
//     ]);
    
//     const [text, setText] = useState('');
   
//     function addTask(text) {
//         const newTask = {
//             id: Date.now(),
//             text,
//             completed: false
//         };
//         setTasks([...tasks, newTask]);
//         setText('');
//     }

//     function deleteTask(id) {
//         setTasks(tasks.filter(task => task.id !== id));
//     }

//     function toggleCompleted(id) {
//         setTasks(tasks.map(task => {
//             if (task.id === id) {
//                 return {...task, completed: !task.completed};
//             } else {
//                 return task;
//             } 
//         }));
//     }

//     return (
//         <div className="todo-list">
//             {tasks.map(task => (
//                 <TodoItem
//                     key={task.id} 
//                     task={task}
//                     deleteTask={deleteTask}
//                     toggleCompleted={toggleCompleted}/>
//             ))}
//             <input value={text} onChange={e => setText(e.target.value)}/>
//             <button onClick={() => addTask(text)}>Add</button>
//         </div>
//     );
// }

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            text: ''
        };
    }
   
    addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        this.setState({tasks: [...this.state.tasks, newTask]});
    }

    deleteTask(id) {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== id)
        });
    }

    toggleCompleted(id) {
    //     setstate(tasks.map(task => {
    //         if (task.id === id) {
    //             return {...task, completed: !task.completed};
    //         } else {
    //             return task;
    //         } 
    //     }));
    }

    render() {
        return (
        <div className="todo-list">
            {this.state.tasks.map((task) => {
                return <TodoItem
                    key={task.id} 
                    task={task}
                    deleteTask={this.deleteTask}
                    toggleCompleted={this.toggleCompleted}/>
            })}
            <input value={this.state.text} onChange={e => this.setState({text: e.target.value})}/>
            <button onClick={() => this.addTask(this.state.text)}>Add</button>
        </div>
    )};
}

export default TodoList;

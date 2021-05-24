import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import fbase from './firebase';
import Task from './Task';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container'
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';



const HomePage = ({ user }) => {
    const [tasks, setTasks] = useState([]);
    let fetchedTasks = [];


    const listTasks = () => fbase.database().ref().child(user.uid).get().then((snapshot) => {
        fetchedTasks = [];
        setTasks([]);
        if (snapshot.exists()) {
            snapshot.forEach(item => {
                fetchedTasks.push(item.val());
            });
            setTasks([...fetchedTasks]);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });




    useEffect(() => {
        listTasks();
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            //overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            alignItems: "center",
            justify: "center",
            position: 'relative',
            left: 300,

        },
        gridList: {
            width: 700,
            height: 450,
            alignItems: "center",
            justify: "center",

        },
    }));
    const classes = useStyles();


    return (
        <div>
            <h1>Tasks</h1>
            <section className='homepage'>

                < div className='task-add'>
                    <AddTask listTasks={listTasks} dbtype={'realtime-database'} />
                </div>
                <div className={classes.root}>
                    <GridList className={classes.gridList} cols={2}>
                        {tasks.map((task, index) => {
                            //change key 
                            return (
                                <Container style={{ boxShadow: '3px 3px 3px 2px rgba(0, 0, 0, 0.3)' }}>
                                    <Task key={index} task={task} listTasks={listTasks}></Task>
                                </Container>
                            )
                        })}
                    </GridList>
                </div>

            </section>
        </div >
    );

}

export default HomePage;
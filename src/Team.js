import React, { useEffect, useState } from 'react';
import fbase from 'firebase';
import AddTask from './AddTask';
import TaskForTeam from './TaskForTeam';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import GridList from '@material-ui/core/GridList';
import { makeStyles } from '@material-ui/core/styles';


export default function Team({ team }) {
    const uid = fbase.auth().currentUser.uid;
    const [members, setMembers] = useState();
    const [tasks, setTasks] = useState([]);
    const [tasksToggle, setTasksToggle] = useState(false);
    let fetchedTasks = [];
    let membersFetch = [];

    useEffect(() => { getMembers() }, []);

    const getMembers = () => {
        fbase.firestore().collection('/users').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (team.members.includes(doc.data().id)) {
                    membersFetch.push(doc.data())
                }
            })
            setMembers(membersFetch);
        })
    }


    const listGroupTasks = () => {
        setTasks([]);
        fetchedTasks = [];
        fbase.firestore().collection('/groups').doc(team.id).get().then((doc) => {
            for (const item in doc.data()) {
                if (typeof doc.data()[item] === 'object') {
                    if (doc.data()[item].hasOwnProperty('type')) {
                        fetchedTasks.push(doc.data()[item]);
                    }
                }
            }
            setTasks(fetchedTasks);

        })
    }



    useEffect(() => {
        listGroupTasks();
    }, []);



    return (
        <GridList>

            <Container >
                <h2 style={{ color: '#060b26', margin: '2px 4px' }}>Team's name: {team.name}</h2>
                <h3 style={{ color: '#060b26', margin: '2px 4px' }}>Team's desctiption: {team.teamDescription}</h3>

                <div>
                    <h3 style={{ color: '#060b26', margin: '10px 4px' }}>Members: </h3>
                    <div>
                        {members ? members.map(member => {
                            return (
                                <div key={member.id}>
                                    <h3 style={{ color: '#060b26', margin: '3px' }}>{member.name}</h3>
                                    <h4 style={{ color: '#060b26', margin: '3px', marginLeft: '15px' }}>{member.email}</h4>
                                </div>
                            )
                        }) : <h3>The team doesn't have any members</h3>}
                    </div>

                </div>
            </Container>
            <Container >
                <AddTask dbtype={'firestore'} team={team} listGroupTasks={listGroupTasks} />
            </Container>
            <Container fluid >
                <div>
                    <button className='btn' onClick={() => setTasksToggle(!tasksToggle)}>{tasksToggle ? 'Hide tasks' : 'Show tasks'}</button>
                    {tasksToggle ?
                        <div>
                            {tasks.map((task, index) => {
                                //change key 
                                return (<Container>
                                    <TaskForTeam key={index} task={task} listGroupTasks={listGroupTasks} team={team} />
                                </Container>
                                )
                            })}
                        </div>
                        : <div></div>}

                </div>
            </Container>

        </GridList >
    )
}

import React from 'react';
import {gql, useQuery} from "@apollo/client";
import './sample.css';
import './addstyle.css'
//
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_STUDENTS = gql`
{
    students{
        _id
      firstName
      lastName
      program
      
    }
}
`;
//
const StudentList = () => {

    const { loading, error, data , refetch } = useQuery(GET_STUDENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <table >
                <tr>
                        <th>_id</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>program</th>

                </tr>
                {data.students.map((student, index) => (
                        <tr key={index}>
                            <td>{student._id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.program}</td>

                        </tr>
                ))}
             
            </table>
            
            <div class="center">
                <button class = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default StudentList


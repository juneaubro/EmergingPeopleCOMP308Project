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
const GET_VITALSIGNS = gql`
{
    vitals{
        _id
        bodyTemp
        heartRate
        bloodPressure
        respiratoryRate
    }
}
`;
//
const VitalSignsList = () => {

    const { loading, error, data , refetch } = useQuery(GET_VITALSIGNS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <table >
                <tr>
                        <th>_id</th>
                        <th>bodyTemp</th>
                        <th>heartRate</th>
                        <th>bloodPressure</th>
                        <th>respiratoryRate</th>

                </tr>
                {data.vitals.map((vitalsign, index) => (
                        <tr key={index}>
                            <td>{vitalsign._id}</td>
                            <td>{vitalsign.bodyTemp}</td>
                            <td>{vitalsign.heartRate}</td>
                            <td>{vitalsign.bloodPressure}</td>
                            <td>{vitalsign.respiratoryRate}</td>

                        </tr>
                ))}
             
            </table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default VitalSignsList


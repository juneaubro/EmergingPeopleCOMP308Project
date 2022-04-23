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
const GET_ALERTS = gql`
{
    emergencyAlerts{
        message
        nurse
      }
}
`;
//
const EmergencyAlertList = () => {

    const { loading, error, data , refetch } = useQuery(GET_ALERTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <table >
                <tr>
                        <th>Message</th>
                        <th>Nurse</th>
                </tr>
                {data.emergencyAlerts.map((emergencyAlerts, index) => (
                        <tr key={index}>
                            <td>{emergencyAlerts.message}</td>
                            <td>{emergencyAlerts.nurse}</td>
                        </tr>
                ))}
             
            </table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default EmergencyAlertList


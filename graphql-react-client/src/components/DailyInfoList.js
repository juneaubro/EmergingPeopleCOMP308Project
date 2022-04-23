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
const GET_DAILYINFOALL = gql`
{
    dailyInformationAll{
        pulseRate
        bloodPressure
        weight
        temperature
        respiratoryRate
      }
}
`;
//
const DailyInformationList = () => {

    const { loading, error, data , refetch } = useQuery(GET_DAILYINFOALL);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <table >
                <tr>
                        <th>Pulse Rate</th>
                        <th>Blood Pressure</th>
                        <th>Weight</th>
                        <th>Temperature</th>
                        <th>Respiratory Rate</th>
                        
                </tr>
                {data.dailyInformationAll.map((dailyInformationAll, index) => (
                        <tr key={index}>
                            <td>{dailyInformationAll.pulseRate}</td>
                            <td>{dailyInformationAll.bloodPressure}</td>
                            <td>{dailyInformationAll.weight}</td>
                            <td>{dailyInformationAll.temperature}</td>
                            <td>{dailyInformationAll.respiratoryRate}</td>
                        </tr>
                ))}
             
            </table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default DailyInformationList


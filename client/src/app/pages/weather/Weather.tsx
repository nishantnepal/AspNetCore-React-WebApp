import { DetailsList, DetailsListLayoutMode, IColumn, Spinner, SpinnerSize } from '@fluentui/react';
import { ApiClient, IGroupDto } from 'app/generated/backend';
import { AppConfigs } from 'app/utils/config';
import React, { useEffect, useState } from 'react';

const Weather: React.FC = () => {
    const [data, setData] = useState({
        weather: "",
        isFetching: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ weather: data.weather, isFetching: true });
                //const result = await new ApiClient(process.env.REACT_APP_API_BASE).groups_GetAllGroups();
                console.log('AppConfigs.Configs.API_BASE ' + AppConfigs.Configs.API_BASE)    
                console.log('process.env.REACT_APP_API_BASE ' + process.env.REACT_APP_API_BASE)    
                // @ts-ignore            
                const result = await new ApiClient(AppConfigs.Configs.API_BASE).ping_GetWeather();
                setData({ weather: result, isFetching: false });
            } catch (e) {
                console.log(e);
                setData({ weather: data.weather, isFetching: false });
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2>Weather</h2>
            <div>
                {data.weather}
                </div>
            {data.isFetching && <Spinner size={SpinnerSize.large} />}
        </>
    );
};

export default Weather;

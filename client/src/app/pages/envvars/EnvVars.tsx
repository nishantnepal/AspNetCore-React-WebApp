import { DetailsList, DetailsListLayoutMode, IColumn, Spinner, SpinnerSize } from '@fluentui/react';
import { ApiClient, IEnvVars, IGroupDto } from 'app/generated/backend';
import { AppConfigs } from 'app/utils/config';
import React, { useEffect, useState } from 'react';



const EnvVars: React.FC = () => {
    const [data, setData] = useState({
        vars: [] as IEnvVars[],
        isFetching: false
    });

    const groupKeys: IEnvVars = {
        Key: '',
        Value: ''       
    };

    

    const columns = Object.keys(groupKeys).map(
        (key): IColumn => {
            return {
                key,
                name: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str: string) => {
                    return str.toUpperCase();
                }),
                fieldName: key,
                minWidth: 100,
                maxWidth: 200,
                isResizable: true
            };
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({ vars: data.vars, isFetching: true });
                //const result = await new ApiClient(process.env.REACT_APP_API_BASE).groups_GetAllGroups();
                console.log('AppConfigs.Configs.API_BASE ' + AppConfigs.Configs.API_BASE)    
                console.log('process.env.REACT_APP_API_BASE ' + process.env.REACT_APP_API_BASE)    
                // @ts-ignore            
                const result = await new ApiClient(AppConfigs.Configs.API_BASE).ping_GetEnvVars();
                setData({ vars: result, isFetching: false });
            } catch (e) {
                console.log(e);
                setData({ vars: data.vars, isFetching: false });
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2>Groups</h2>
            <DetailsList
                items={data.vars.map((group) => {
                    return {
                        ...group,
                        Key: group.Key.toLocaleString(),
                        Value: group.Value.toLocaleString()
                    };
                })}
                columns={columns}
                layoutMode={DetailsListLayoutMode.justified}
            />
            {data.isFetching && <Spinner size={SpinnerSize.large} />}
        </>
    );
};

export default EnvVars;

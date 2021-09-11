import React, { useEffect } from 'react'
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../Redux/actions/transactions';
import { agentId } from '../../Utils/helpers';
import { TransData } from './data';
import { TransHeader } from './header';

function ViewTransactions({navigation}){
    const [ type, setType ] = useState('all');
    const [ activeDate, setActive ] = useState('week');
    const { data } = useSelector(({ users: { currUser } }) =>currUser);
    const { dataSt } = useSelector(({ stations: {currStation} }) =>currStation);
    const dispatch = useDispatch();
    const rKey = navigation.getState().history[0].key

    useEffect(() =>{
        getTransactions(dataSt.id, agentId(data.Agents, dataSt.id), 0, 20, type)(dispatch)
    }, [data, dataSt, type, rKey])

    return(
        <ScrollView>
            <TransHeader type={type} setType={setType} active={activeDate} setActive={setActive} />
            <TransData />
        </ScrollView>
    )
};

export default ViewTransactions;
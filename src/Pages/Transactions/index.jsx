import React, { useEffect } from 'react'
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
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
    const { countTrans } = useSelector(({ transactions: {transactions} }) =>transactions);
    const dispatch = useDispatch();
    const rKey = navigation.getState().history[0].key
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrent] = useState(0);
    const limit = 5;

    useEffect(() =>{
        getTransactions(dataSt.id, agentId(data.Agents, dataSt.id), offset, limit, type)(dispatch)
    }, [data, dataSt, type, rKey, offset, limit, currentPage])

    return(
        <ScrollView>
            <TransHeader type={type} setType={setType} active={activeDate} setActive={setActive} />
            <TransData />
            <DataTable.Pagination
                page={currentPage}
                numberOfPages={Math.ceil(countTrans / limit)}

                onPageChange={page => {setCurrent(page); setOffset((page)*limit)}}
                numberOfItemsPerPage={limit}
                selectPageDropdownLabel={'Rows per page'}
            />
        </ScrollView>
    )
};

export default ViewTransactions;
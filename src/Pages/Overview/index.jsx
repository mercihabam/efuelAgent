import React, { useState } from "react";
import { ScrollView } from "react-native";
import { OverHeader } from "./header";
import { OverTitle } from "./overTitle";
import { Transactions } from "./transactions";

function Overview(){
    const [selectValue, setSelectedValue] = useState('all');

    return(
        <ScrollView>
            <OverHeader />
            <OverTitle selectValue={selectValue} setSelectedValue={setSelectedValue} />
            <Transactions type={selectValue} />
        </ScrollView>
    )
};

export default Overview;
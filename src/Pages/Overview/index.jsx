import React from "react";
import { ScrollView } from "react-native";
import { OverHeader } from "./header";
import { OverTitle } from "./overTitle";
import { Transactions } from "./transactions";

function Overview(){

    return(
        <ScrollView>
            <OverHeader />
            <OverTitle />
            <Transactions />
        </ScrollView>
    )
};

export default Overview;
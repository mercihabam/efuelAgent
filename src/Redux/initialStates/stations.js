export default {
    stations: {
        dataStations: {},
        stationsRows: [],
        stationsCount: 0,
        loadingStations: true,
        error: null
    },
    createStation: {
        loadingCreate: false,
        error: '',
        data: {}
    },
    updateStation: {
        loadingUpdate: false,
        errorUpdate: '',
        data: {}
    },
    currStation: {
        loadingCurrSt: false,
        dataSt: { Wallet: {} },
        error: null
    }
}
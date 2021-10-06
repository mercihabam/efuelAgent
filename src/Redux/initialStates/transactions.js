export default {
    transactions: {
        loadingTrans: true,
        error: null,
        dataTrans: {},
        rowsTrans: [],
        countTrans: 0
    },
    sell: {
        loadingSell: false,
        errorSell: '',
        msg: null,
        data: { Client: { Wallet: {} } }
    },
    recharge: {
        loadingRecharge: false,
        errorRecharge: '',
        msg: null,
        data: { trans: {}, receiver: {} }
    }
}
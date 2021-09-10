export default {
    login: {
        loading: false,
        data: { Stations: [] },
        error: '',
        token: ''
    },
    currUser: {
        loadingCurr: true,
        auth: undefined,
        data: { fullName: '', Agent: {} },
        error: null,
        stations: []
    },
    signup: {
        loading: false,
        data: {},
        error: ''
    }
}
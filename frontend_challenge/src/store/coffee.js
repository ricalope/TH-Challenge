const GET_COFFEES = 'coffees/GET_COFFEES';
const ADD_COFFEE = 'coffees/ADD_COFFEE';
const DELETE_COFFEE = 'coffees/DELETE_COFFEE';


const getCoffees = coffees => ({
    type: GET_COFFEES,
    coffees
})


const addCoffee = coffee => ({
    type: ADD_COFFEE,
    coffee
})


const deleteCoffee = coffeeId => ({
    type: DELETE_COFFEE,
    coffeeId
})


export const getAllCoffeesThunk = () => async dispatch => {
    const res = await fetch('/api/coffee')
    if(res.ok) {
        const data = await res.json()
        dispatch(getCoffees(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data
        }
    }
}


export const addCoffeeThunk = coffee => async dispatch => {
    const { name, year, caffeine } = coffee
    const res = await fetch('/api/coffee/create', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, year, caffeine_content: caffeine })
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(addCoffee(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if(data.errors) {
            return data
        }
    }
}


export const deleteCoffeeThunk = coffeeId => async dispatch => {
    const res = await fetch(`/api/coffee/delete/${coffeeId}`, {
        method: "DELETE"
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(deleteCoffee(coffeeId))
        return data
    } else if(res.status < 500) {
        const data = await res.json()
        if(data.errors) {
            return data
        }
    }
}


const initialState = { all: {}, one: {} }


const coffeesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COFFEES: {
            const newState = { ...state, all: { ...state.all } }
            action.coffees.forEach(coff => newState.all[coff.id] = coff)
            return newState
        }
        case ADD_COFFEE: {
            const newState = { ...state, all: { ...state.all } }
            newState.all[action.coffee.id] = action.coffee
            return newState
        }
        case DELETE_COFFEE: {
            const newState = { ...state, all: { ...state.all } }
            delete newState.all[action.coffeeId]
            return newState
        }
        default:
            return state
    }
}

export default coffeesReducer;

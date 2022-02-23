import {createContext, useCallback, useContext, useMemo, useState} from "react";

const PlayersContext = createContext()

export function PlayerProvider(props) {
    const [players, setPlayers] = useState([])
    const [errorToast, setErrorToast] = useState({state: false, message:''})

    const updatePlayers = useCallback((newPlayers)=> {
        setPlayers([...newPlayers])
    }, [setPlayers])
    
    const checkNameAvailability = useCallback((name)=> {
        return !players.some(player=>player.name===name)
    }, [players])

    const api = useMemo(()=>({
        players,
        updatePlayers,
        checkNameAvailability,
        errorToast,
        setErrorToast
    }), [checkNameAvailability, errorToast, players, setErrorToast, updatePlayers])

    return <PlayersContext.Provider value={api}>
        {props.children}
    </PlayersContext.Provider>
}

export const usePlayerContext = () => useContext(PlayersContext)
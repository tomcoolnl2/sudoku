
import { FC, useReducer, createContext, Dispatch } from 'react'


export enum ActionType {
	CHOMP = 'CHOMP',
	REVIVE = 'REVIVE',
}

type Action = {
	type: ActionType,
	payload: string
}

interface Person {
    name: string	
    alive: boolean
}

type PeopleContext = {
	state: Person[], 
	dispatch: Dispatch<Action>
}

const people: Person[] = [
	{ name: 'Jay', alive: true },
	{ name: 'Kailee', alive: true },
	{ name: 'John', alive: true },
	{ name: 'Mia', alive: true }
]

const reducer = (state: Person[], { type, payload }: Action): Person[] => {

	switch (type) {
	case ActionType.CHOMP: {
		return state.map(person => {
			if (person.name === payload) {
				person.alive = false    
			}
			return person
		})
	}
	case ActionType.REVIVE: {
		return state.map(person => {
			if (person.name === payload) {
				person.alive = true
			}
			return person
		})
	}
	default: {
		return state
	}
	}
}

const initialContextState: PeopleContext = { state: people, dispatch: null }

export const PeopleContext = createContext<PeopleContext>(initialContextState)

export const People: FC = ({ children }) => {	
	const [state, dispatch] = useReducer(reducer, people)

	return (
		<PeopleContext.Provider value={{ state, dispatch }}>
			{children}
		</PeopleContext.Provider>
	)
}
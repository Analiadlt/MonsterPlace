import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sellOrder, getCard} from '../../redux/actions'

export default function Comprar() {
  const dispatch = useDispatch()
//   const cards = useSelector(state => state.cards)
  


  const [state, setState] = useState({
    email: '',
    allCards: [],
 })

 const onChange = (e) => {
    let field_name = e.target.name;
    let field_value = e.target.value;
    setState(prev => ({...prev, [field_name]: field_value}) )
}

const onSubmit = (e) => {
    e.preventDefault()
    if (state.email && state.allCards.length > 0) {
        console.log("dede form: ", state.email, state.allCards)
        dispatch(sellOrder(state))
    }
    else {
        console.log('ERROR')
    }
}
return (
    <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
            <h2 className="text-center">Prueba</h2>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="form-group">
                    <label>User Email</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={state.email = "zaraza@ameil.com"}
                        onChange={onChange}
                        required/>
                </div>
                <div className="form-group">
                        <label> Id Card</label>
                        <input
                            type="allCards"
                            className="form-control"
                            name="allCards"
                            value={state.allCards = ["c961409a-8b0f-4fe1-924b-13d26a704007", "e0a0fe29-89b2-4ea9-8d8f-af6a27845a39"]}
                            onChange={onChange}
                            required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );


}

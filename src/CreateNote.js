import React from 'react'
import ReactDOM from 'react-dom'
import {createNote} from './store'
import {connect} from 'react-redux'


 class CreateNote extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
           text: '' 
        }

       this.Submit = this.Submit.bind(this)
    }
 
 
    Submit(ev) {
        ev.preventDefault()
        const {text} = this.state
        console.log(text)
        this.props.createNote(text)
        this.setState({text: ''})
    }
    
    render() {
        const {text} = this.state
        const {Submit} = this
        return (
            <form onSubmit={Submit}> 
                <input onChange={ev => this.setState({text: ev.target.value})} name='text' value={text} placeholder='Enter new note' />
                <button> Submit </button>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        createNote: (note) => dispatch(createNote(note))
    }
}

export default connect(state => state, mapDispatchToProps)(CreateNote) 
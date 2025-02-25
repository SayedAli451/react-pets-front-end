/* eslint-disable react/prop-types */
const PetDetail = (props) => {

    if (!props.selected) {
        return (
            <div>
                <h1>No Pet Selected</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>{props.selected.name}</h1>
            <h2>Breed: {props.selected.breed}</h2>
            <h2>Age: {props.selected.age} years old</h2>

            <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
            <button onClick={() => props.handleRemovePet(props.selected._id)}>Remove Pet</button>
        </div>

    )
}

export default PetDetail
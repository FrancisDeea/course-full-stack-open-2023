const Form = ({number, name, handleChangeName, handleChangeNumber, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input value={name} onChange={handleChangeName} />
        </div>

        <div>
            number: <input type='tel' value={number} onChange={handleChangeNumber} />
        </div>

        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default Form;
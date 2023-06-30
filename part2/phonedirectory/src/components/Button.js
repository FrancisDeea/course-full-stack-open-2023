const Button = ({ value, onclick, id }) => <button onClick={() => onclick(id)}>{value}</button>

export default Button;
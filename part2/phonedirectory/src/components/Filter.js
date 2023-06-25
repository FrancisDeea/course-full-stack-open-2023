const Filter = ({ text, onchange }) => (
    <>
        Filter (shown with): <input value={text} onChange={onchange} />
    </>
)

export default Filter;
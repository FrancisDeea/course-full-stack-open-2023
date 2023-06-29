const Search = ({ search, handleChange }) => (
    <>
        <label htmlFor="countries">Find countries: </label>
        <input type="text" id="countries" onChange={handleChange} value={search} />
    </>
)

export default Search
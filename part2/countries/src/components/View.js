const View = ({ data }) => {
    const languagues = Object.values(data.languages);
    const { png, alt } = data.flags;

    return (
        <>
            <h2>{data.name.common}</h2>
            <p>Capital: {data.capital.join(", ")}</p>
            <p>Population: {data.population}</p>

            <h3>Languagues</h3>
            <ul>
                {
                    languagues.map(item => <li key={item}>{item}</li>)
                }
            </ul>
            <img src={png} alt={alt} width={200} />
        </>
    )
}

export default View;
import View from './View';

const Result = ({ data, setData }) => {
    const length = data.length;

    if (length > 10) { return "Too many matches, specify another filter" }

    if (length <= 10 && length > 1) {
        return (
            <>
                {
                    data.map(country => {
                        return (
                            <div key={country.name.common}>
                                <p key={country.name.common}>{country.name.common}</p>
                                <button onClick={() => setData([country])}>show</button>
                            </div>
                        )
                    })
                }
            </>
        )
    }

    if (length === 1) {
        return <View data={data[0]} />
    }
}

export default Result
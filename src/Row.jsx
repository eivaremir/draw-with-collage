
const Cell = (pathDatum, wid, pathColors) => {

    return (
        <div className="picture" style={{
            width: `${wid}%`
        }}
        >
            <svg viewBox="0 0 500 500">

                {pathDatum.map((path, i) => (
                    <path key={"p" + i} d={path} fill={pathColors[i]} />
                ))}

                {/* {pathDatum.map((path) => (
                    <path d={path} />
                ))
                } */}
            </svg></div>
    )
}


function Row(arr) {

    for (let i = 0; i < arr.length; i++) { //arr.length
        console.log("arr[", i, "]: ", arr[i])
        arr[i] = Cell(arr[i], arr.length)
    }

    return (
        (arr)
    );
};

export default Cell
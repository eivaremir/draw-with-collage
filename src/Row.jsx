const Cell = (a, l) => {

    console.log("Esto es a", a, l)
    return (

        <div className="picture" style={{
            width: `${100 / (Math.ceil(Math.sqrt(l)) + 1)}%`
        }}
        >
            <svg viewBox="0 0 500 500">
                {a.map((path) => (
                    <path d={path} />
                ))
                }
            </svg></div>
    )
}


function Row(arr) {

    for (let i = 0; i < arr.length; i++) { //a.length
        console.log("arr[", i, "]: ", arr[i])
        arr[i] = Cell(arr[i], arr.length)
    }

    return (
        (arr)
    );
};

export default Cell
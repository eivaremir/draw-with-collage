const Cell = (a, l) => {

    let b
    const c = 100 / (Math.ceil(Math.sqrt(l)))
    do { b = Math.round(Math.random() * 100, 0) } while ((b < 10) || (b > c))

    console.log("Esto es a", a, l)
    return (
        <div className="picture" style={{
            width: `${b}%`
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
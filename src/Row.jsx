
const Cell = (arr, wid) => {

    return (
        <div className="picture" style={{
            width: `${wid}%`
        }}
        >
            <svg viewBox="0 0 500 500">
                {arr.map((path) => (
                    <path d={path} />
                ))
                }
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
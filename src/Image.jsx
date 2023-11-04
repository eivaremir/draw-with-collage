const Image = ({pathDatum, pathColors,basis}) => {


    return (
       
            <svg viewBox="0 0 500 500" style={{flexBasis:basis+'%',border: pathDatum  ?'1px solid #d9d9d9':''}}>

                {pathDatum && pathDatum.map((path, i) => (
                    <path key={"p" + i} d={path} fill={pathColors[i]} />
                ))}

                
            </svg>
    )
}
export default Image
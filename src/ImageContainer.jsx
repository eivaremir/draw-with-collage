
const ImageContainer=({children,width}) =>{
    
    
    return (
        <div style={{display:'flex',width: width,
        flexWrap: 'wrap'}}>
            {children}
        </div>
    )
}

export default ImageContainer
function Branch({ image, alt, uri }) {
    return (
        <>
            <a href={uri} className="relative mt-12 flex justify-center items-center hover:scale-125">
                <div className="absolute w-32 h-32 rounded-full bg-radial"></div>
                <img
                    src={image}
                    alt={alt}
                    className="relative z-10 p-6 w-32 h-32 object-contain rounded-full overflow-visible"
                />
            </a>
        </>
    );
  }
  
  export default Branch;
  
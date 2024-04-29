export function HeaderImage(){
    const imgHeader = new URL("@/public/images/oficina.jpg", import.meta.url).href;
    return(
        <div>
            <img className="-mt-16 h-auto w-auto" src={imgHeader} alt="Oficina Frente" />
        </div>   
    )
}
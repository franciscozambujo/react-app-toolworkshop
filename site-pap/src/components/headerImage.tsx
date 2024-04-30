export function HeaderImage(){
    const imgHeader = new URL("@/public/images/oficina.jpg", import.meta.url).href;
    return(
        <div>
            <img className="-mt-20 h-auto w-auto" src={imgHeader} alt="Oficina Frente" />
            <h1 className="font-header text-5xl top-40 ml-64 absolute text-white">TESTE</h1>
        </div>   
    )
}
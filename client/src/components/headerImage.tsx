export function HeaderImage(){
    const imgHeader = new URL("@/public/images/oficina.jpg", import.meta.url).href;
    return(

        <div>
            <img className="-mt-16 w-full" src={imgHeader} alt="Oficina Frente" />
            <div className="font-header text-5xl top-40 ml-64 absolute text-white">
                <div className="w-24 origin-top-left rotate-[90deg] absolute border-4 border-white"/>
                <h1 className="ml-4 underline underline-offset-4">REPARAÇÃO E MANUTENÇÃO DE <br /> AUTOMÓVEIS MULTIMARCA</h1>
            </div>
        </div>   
    )
}
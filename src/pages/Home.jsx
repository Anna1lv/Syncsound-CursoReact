const Home = () => {
    return(
        <main className="max-w-6xl mx-auto px-4 pt-24 pb-12">
            <form className="flex gap-2 mb-6">

                <input 
                    type="text" 
                    placeholder="Buscar músicas ou artistas..." 
                    className="flex-1 bg-slate-800 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-400"
                />
                <button type="submit"
                    className="bg-orange-400 hover:bg-orange-300 text-slate-950 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer">Buscar</button>
            </form>

            <p className="text-slate-400 text-center py-20">
                As músicas vão aparecer por aqui...
            </p>
        </main>
    );
}

export default Home;
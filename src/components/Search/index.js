import { BiSearchAlt } from "react-icons/bi";


function Search() {
    return ( 
        <div>
            <input placeholder={`Search by name, catagories, branch, ...`} className="absolute right-1/4 ml-48 border border-slate-400 outline-second rounded-full w-1/2 h-10 p-3 pl-8 text-xs"/>        
            <i className="absolute left-[358px] top-3"><BiSearchAlt color="gray"/></i>
        </div>
     );
}

export default Search;
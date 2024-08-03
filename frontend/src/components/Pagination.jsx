import If from "./If";


export default function Pagination({page, setPage, pagesCount}) {
    let arr = Array(5).fill(0).map((_, index) => {
        let _page = page + index - 2
        return _page > 0 && _page <= pagesCount? _page: undefined
    }).filter(elem => elem)

    return (
        <div className="pagination">
            <If condition={page > 3 && pagesCount !== 1}>
                <button className="page" id="first" onClick={() => setPage(1)}>1</button>
                <p>...</p>
            </If>
            {arr.map((elem, index) =>
                <button
                    key={index}
                    className="page"
                    data-page={elem}
                    style={page === elem? {padding: '10px'}: {}}
                    onClick={e => setPage(+e.target.getAttribute('data-page'))}>
                    {elem}
                </button>
            )}
            <If condition={page + 2 < pagesCount}>
                <p>...</p>
                <button className="page" id="last" onClick={() => setPage(pagesCount)}>{pagesCount}</button>
            </If>
        </div>
    )
}
export default function If({condition, children, otherwise=<></>}) {
    return <>{condition? children: otherwise}</>
}
export function getRedirectTo({type,avatar}){
    let url=''
    url+= type==='boss'?'/boss':'/genius'
    url+= avatar?'':'info'
    return url
}
export function getChatId(from,to){
    return [from,to].sort().join('_');
}
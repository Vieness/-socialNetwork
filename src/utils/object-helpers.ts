export const updateObjectInArray = (items: any, ItemId: any, objPropName: any, newObj: any) => {
    return items.map((u:any) => {
        if (u[objPropName] === ItemId) {
            return {...u, ...newObj}
        }
        return u;
    }
)
}
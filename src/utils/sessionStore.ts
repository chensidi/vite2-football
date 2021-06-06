const sessionStore = {
    get(key: string) {
        try{
            let res = sessionStorage.getItem(key);
            if(res == null) {
                return {};
            }else {
                res = JSON.parse(res);
                return res;
            }
        }catch(e) {
            return {};
        }
    },
    set(key: string, val: any) {
        sessionStorage.setItem(key, JSON.stringify(val));
    },
    remove(key: string) {
        sessionStorage.removeItem(key);
    },
    clear() {
        sessionStorage.clear();
    }
}

export default sessionStore;
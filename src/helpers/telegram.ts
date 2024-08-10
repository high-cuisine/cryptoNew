function parseInitData(initData: string) {
    const q = new URLSearchParams(initData);
    const hash = q.get("hash");
    q.delete("hash");
    const v = Array.from(q.entries());
    v.sort(([aN], [bN]) => aN.localeCompare(bN));
    const data_check_string = v.map(([n, v]) => `${n}=${v}`).join("\n");
    return { hash, data_check_string };
}

export {
    parseInitData,
}

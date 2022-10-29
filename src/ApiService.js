async function query(data) {
    return await new Promise((res, rej) => {
        setTimeout(() => {
            res(data);
        }, 1000);
    });
}

export { query };

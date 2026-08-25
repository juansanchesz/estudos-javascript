const descreverTipo = (valor) => {
    const tipo = typeof valor;

    if (tipo !== "object") {
        return `${tipo} - primitivo`;
    } else if (valor === null) {
        return `${tipo} - primitivo`;
    } else {
        return `${tipo} - object`;
    }
};

console.log(descreverTipo(42));
console.log(descreverTipo("oi"));
console.log(descreverTipo(null));
console.log(descreverTipo([1, 2]));
console.log(descreverTipo({ a: 1 }));

/*
**1.6.2 — Primitivo ou object?**
Escreva `descreverTipo(valor)` que responde **duas perguntas** sobre um valor e junta as respostas numa string só: o que o `typeof` diz, e se o valor é de fato primitivo ou object.

O motivo de a função existir é que `typeof` mente num caso: ele responde `"object"` para `null`, `[1, 2]` e `{ a: 1 }` — mas `null` é primitivo. Sua função corrige isso.

```
descreverTipo(42)        -> "number — primitivo"
descreverTipo("oi")      -> "string — primitivo"
descreverTipo(null)      -> "object — primitivo"   (typeof mente aqui)
descreverTipo([1, 2])    -> "object — object"
descreverTipo({ a: 1 })  -> "object — object"
```
*/

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

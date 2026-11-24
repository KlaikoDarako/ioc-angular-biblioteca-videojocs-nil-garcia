# Models i adaptadors

## Interfícies principals

### Videojoc (model intern)

Model utilitzat dins l'aplicació Angular:

```typescript
interface Videojoc {
  id: number;
  titol: string;
  descripcio: string;
  categoria: CategoriaVideojoc;
  dataLlancament: string;
  puntuacio: number;
  destacat?: boolean;
}
```

### VideojocApiResponse (resposta API)

Format de les dades que retorna l'API:

```typescript
interface VideojocApiResponse {
  id: string;
  titol: string;
  descripcio: string;
  categoria: CategoriaVideojoc;
  dataLlancament: string;
  puntuacio: number;
  destacat?: boolean;
}
```

## Adaptadors

### adaptarVideojocApi()

Transforma un videojoc de l'API al format intern:

- Converteix `id` de `string` a `number`.
- Elimina els espais sobrants de `titol` i `descripcio`.
- Normalitza `categoria`.
- Converteix `puntuacio` a número de manera segura.
- Assigna `false` si falta el camp `destacat`.

### adaptarVideojocsApi()

Aplica `adaptarVideojocApi()` a un array de videojocs.

### videojocBuit()

Retorna un videojoc amb valors per defecte per inicialitzar formularis.

## Mapeig de camps

| Camp API         | Camp intern      | Transformació                       |
| ---------------- | ---------------- | ----------------------------------- |
| `id`             | `id`             | Conversió a `number`                |
| `titol`          | `titol`          | `trim()` + valor per defecte        |
| `descripcio`     | `descripcio`     | `trim()`                            |
| `categoria`      | `categoria`      | `trim()` + normalització            |
| `dataLlancament` | `dataLlancament` | Es manté el format de data          |
| `puntuacio`      | `puntuacio`      | `Number()` segur (0 si no és vàlid) |
| `destacat`       | `destacat`       | `false` si falta el valor           |

---

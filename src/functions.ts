export function textToChunks(input: string, size: number = 1024): string[] {
  if (input.at(-1) !== "\n") input += "\n"
  let fields: string[] = []
  let indexes = [...input.matchAll(/\n/g)].map(({ index }) => index)
  let breakIndexes = []
  let previousIndex = 0;
  let previousStartIndex = 0;
  let n = 1;
  if (input.length > size) {

    for (let index of indexes) {
      if (index - previousStartIndex >= size && previousIndex - previousStartIndex < size) {
        n++;
        breakIndexes.push([previousStartIndex, previousIndex]);
        previousStartIndex = previousIndex
      }
      previousIndex = index;
    }
    breakIndexes.push([previousStartIndex, indexes.at(-1)])

    let groups = []
    for (let [breakStartIndex, breakIndex] of breakIndexes) {
      groups.push(input.slice(breakStartIndex, breakIndex))
    }
    if (breakIndexes.length > 0) groups.push(input.slice(breakIndexes.at(-1)[1], input.length));

    groups.forEach((e) =>
      fields.push(e)
    )
    let lastField = fields.at(-1);
    if (lastField == "\n" || lastField == "") fields.pop()
    lastField = fields.at(-1);
    if (lastField == "\n" || lastField == "") fields.pop()

    return fields
  } else {
    return [input]
  }
}
export function buildMenuInclude(depth: number): object {
    if (depth <= 0) return {}; // Stop recursion at a certain depth

    return {
        children: {
            include: buildMenuInclude(depth - 1),
        },
    };
}
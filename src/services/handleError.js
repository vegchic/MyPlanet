export default async function handleError(ctx, next) {
    try {
        await next();
    } catch (err) {
        console.error(`${ctx.method} - ${ctx.path}: ${err.message}`);
    }
}
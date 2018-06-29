import galaxy from './galaxy';
import star from './star';
import planet from './planet';
import satellite from './satellite';
import comet from './comet';

const All = {
    galaxies: galaxy(),
    stars: star(),
    planets: planet(),
    satellites: satellite(),
    comets: comet(),
};

export async function addOne(ctx) {
    let { category } = ctx.params;
    return All[category].addOne(ctx);
}

export async function getOne(ctx) {
    let { category } = ctx.params;
    return All[category].getOne(ctx);
}

export async function getAll(ctx) {
    let { category } = ctx.params;
    return All[category].getAll(ctx);
}

export async function update(ctx) {
    let { category } = ctx.params;
    return All[category].update(ctx);
}

export async function deleteOne(ctx) {
    let { category } = ctx.params;
    return All[category].deleteOne(ctx);
}

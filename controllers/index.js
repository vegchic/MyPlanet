const galaxy = require('./galaxy')();
const star = require('./star')();
const planet = require('./planet')();
const satellite = require('./satellite')();
const comet = require('./comet')();

const All = {
    galaxies: galaxy,
    stars: star,
    planets: planet,
    satellites: satellite,
    comets: comet
};

async function addOne(ctx) {
    let { category } = ctx.params;
    return All[category].addOne(ctx);
}

async function getOne(ctx) {
    let { category } = ctx.params;
    return All[category].getOne(ctx);
}

async function getAll(ctx) {
    let { category } = ctx.params;
    return All[category].getAll(ctx);
}

async function update(ctx) {
    let { category } = ctx.params;
    return All[category].update(ctx);
}

async function deleteOne(ctx) {
    let { category } = ctx.params;
    return All[category].deleteOne(ctx);
}

module.exports = {
    addOne,
    getAll,
    getOne,
    deleteOne,
    update,
};
const Mutations = {
  createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = ctx.db.mutation.createItem;
  }
};

module.exports = Mutations;

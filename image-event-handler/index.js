module.exports = async function (context, req) {
  context.log("✅ Hello from brand new file...");
  context.res = {
    status: 200,
    body: "Function ran successfully",
  };
};